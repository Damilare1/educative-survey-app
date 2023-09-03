import { z, ZodError } from 'zod'

export default defineEventHandler(async (event) => {
  const authorization = getHeader(event, 'authorization') ?? ''
  if (!authorization) {
    return {
      statusCode: 403,
      statusMessage: 'Validation error',
      data: {
        message: 'Missing authorization header'
      }
    }
  }
  const surveyParameters = z.object({
    survey_name: z.string(),
    survey_description: z.string(),
    is_active: z.boolean().optional(),
    start_date: z.string().optional().nullable(),
    end_date: z.string().optional().nullable(),
    questions: z
      .object({
        question: z.string().optional(),
        input_type_id: z.string().optional(),
        options: z
          .object({
            label: z.string().optional()
          })
          .array()
          .optional()
      })
      .array()
      .optional()
  }).strict()
  try {
    const body = surveyParameters.parse(await readBody(event))
    const config = useRuntimeConfig()
    const survey = await $fetch('/surveys/create', {
      baseURL: config.surveyApiUrl,
      method: 'POST',
      body,
      headers: {
        authorization
      }
    })
    return survey
  } catch (e: any) {
    const error = {
      statusCode: e.statusCode ?? 500,
      statusMessage: e.statusMessage ?? 'Internal server error',
      data: e.data ?? null
    }
    if (e instanceof ZodError) {
      error.statusCode = 403
      error.statusMessage = 'Validation error'
      error.data = e.issues
    }
    throw createError(error)
  }
})
