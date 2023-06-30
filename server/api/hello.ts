export default defineEventHandler(async (event) => {
  const queryParams = getQuery(event)
  return {
    message: 'Hello',
    query: queryParams
  }
})
