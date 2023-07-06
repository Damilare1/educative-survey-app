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

  try {
    const config = useRuntimeConfig()
    const { id } = event.context.params as any
    const response: any = await $fetch(`/surveys/${id}/responses`, {
      baseURL: config.surveyApiUrl,
      method: 'GET',
      headers: {
        authorization
      }
    })
    return response
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: e.data?.message ?? null
    })
  }
})
