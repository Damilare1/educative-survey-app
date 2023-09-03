/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const response: any = await $fetch(
      '/input_types',
      {
        baseURL: config.surveyApiUrl,
        method: 'GET'
      }
    )
    return response
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: e.data?.message ?? null
    })
  }
})
