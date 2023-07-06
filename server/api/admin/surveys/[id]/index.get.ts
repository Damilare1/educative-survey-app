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
  try {
    const config = useRuntimeConfig()
    const response: any = await $fetch(`/surveys/admin/${id}`, {
      baseURL: config.surveyApiUrl,
      method: 'GET',
      headers: {
        authorization
      }
    })
    return response
  } catch (e) {
    throw createError({
      statusCode: e.statusCode ?? 500,
      statusMessage: e.statusMessage ?? 'Internal server error',
      data: e.data?.message ?? null
    })
  }
})
