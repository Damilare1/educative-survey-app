import { z, ZodError } from 'zod'

export default defineEventHandler(async (event) => {
  const responseParameters = z.object({
    responses: z
      .object({
        survey_id: z.string(),
        option_id: z.string(),
        question_id: z.string()
      })
      .array()
  }).strict()
  try {
    const payload = await readBody(event)
    const body = responseParameters.parse(payload)
    const config = useRuntimeConfig()
    const response = await $fetch('/survey_responses/create', {
      baseURL: config.surveyApiUrl,
      method: 'POST',
      body
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
