export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as any
    const config = useRuntimeConfig()
    const response: any = await $fetch(`/surveys/${id}/questions`, {
      baseURL: config.surveyApiUrl
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
