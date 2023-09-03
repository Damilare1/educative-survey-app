import { z, ZodError } from 'zod'

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export default defineEventHandler(async (event) => {
  const { id } = event.context.params as any

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
    id: z.string().optional(),
    survey_name: z.string().optional(),
    survey_description: z.string().optional(),
    is_active: z.boolean().optional(),
    start_date: z.string().optional().nullable(),
    end_date: z.string().optional().nullable(),
    admin_id: z.string().optional(),
    questions: z
      .object({
        id: z.string().optional(),
        question: z.string().optional(),
        input_type_id: z.string().optional(),
        admin_id: z.string().optional(),
        survey_id: z.string().optional(),
        options: z
          .object({
            id: z.string().optional(),
            label: z.string().optional(),
            question_id: z.string().optional(),
            admin_id: z.string().optional()
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
    const response: any = await $fetch(`/surveys/${id}`, {
      baseURL: config.surveyApiUrl,
      method: 'PUT',
      body,
      headers: {
        authorization
      }
    })
    return response
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
