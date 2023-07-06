export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      createResponse: async (options: any = {}) => {
        return await useFetch('/api/survey/responses', {
          ...options,
          method: 'POST'
        })
      },
      getResponse: async (id: number, options: any = {}) => {
        return await nuxtApp.$authFetch(`/api/admin/surveys/${id}/responses`, {
          ...options
        })
      }
    }
  }
})
