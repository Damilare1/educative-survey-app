export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await $fetch('http://localhost:8003/api/admin/signup', { method: 'POST', body })
  return { ...user }
})
