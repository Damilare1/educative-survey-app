export default defineEventHandler(async (event) => {
  const headers: any = getHeaders(event) ?? {}
  const { id } = event.context.params as any
  const response: any = await $fetch(`http://localhost:8003/api/surveys/${id as number}`, { method: 'GET', headers: { ...headers } })
  return { ...response }
})
