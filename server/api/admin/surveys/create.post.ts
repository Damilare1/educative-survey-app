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
    id: z.number().optional(),
    survey_name: z.string(),
    survey_description: z.string(),
    is_active: z.boolean().optional(),
    questions: z
      .object({
        id: z.number().optional(),
        question: z.string().optional(),
        input_type_id: z.number().optional(),
        admin_id: z.number().optional(),
        survey_id: z.number().optional(),
        options: z
          .object({
            id: z.number().optional(),
            label: z.string().optional(),
            question_id: z.number().optional(),
            admin_id: z.number().optional()
          })
          .array()
          .optional()
      })
      .array()
      .optional()
  })
  try {
    const body = surveyParameters.parse(await readBody(event))
    const survey = await $fetch('http://localhost:8004/api/surveys', {
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
