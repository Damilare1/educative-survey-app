export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as any
    const response: any = await $fetch(`http://localhost:8004/api/surveys/${id as number}/questions`)
    return response
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: e.data?.message ?? null
    })
  }
})
