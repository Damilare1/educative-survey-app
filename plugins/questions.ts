export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      deleteQuestions: async (options: any = {}) => {
        const { $authFetch } = nuxtApp
        return $authFetch('/api/admin/questions', {
          ...options,
          method: 'POST'
        })
      }
    }
  }
})
