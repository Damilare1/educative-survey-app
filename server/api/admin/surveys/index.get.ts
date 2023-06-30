/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
    const response: any = await $fetch('http://localhost:8004/api/surveys/admin', {
      method: 'GET',
      headers: {
        authorization
      }
    })
    return { ...response }
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: e.data?.message ?? null
    })
  }
})
