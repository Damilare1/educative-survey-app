export default defineEventHandler(async (event) => {
  const headers = getHeaders(event) ?? {}

  const user = await $fetch('http://localhost:8003/api/admin/me', { method: 'GET', headers: { ...headers } })
  return { ...user }
})
