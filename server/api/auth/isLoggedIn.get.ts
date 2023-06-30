/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export default defineEventHandler(async (event) => {
  const authorization = getHeader(event, 'authorization') ?? ''
  if (!authorization) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Validation error',
      data: {
        message: 'Missing authorization header'
      }
    })
  }
  try {
    const user = await $fetch('http://localhost:8004/api/admin/me', {
      method: 'GET',
      headers: {
        authorization
      }
    })
    return user
  } catch (e) {
    throw createError({
      statusCode: e.statusCode ?? 500,
      statusMessage: e.message ?? 'Internal server error',
      data: e.data?.message ?? null
    })
  }
})
