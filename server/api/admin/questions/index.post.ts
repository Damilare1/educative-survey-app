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
  const questionIDParameters = z.object({
    ids: z.number().array()
  }).strict()
  try {
    const body = questionIDParameters.parse(await readBody(event))
    const config = useRuntimeConfig()
    const survey = await $fetch('/survey_questions', {
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
