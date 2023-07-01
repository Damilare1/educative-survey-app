export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getSurvey: async (id: number) => {
        return await useAuthFetch(`/api/survey/${id}/questions`)
      },
      getAdminSurveys: async () => {
        return await useAuthFetch('/api/admin/surveys')
      },
      getSurveyDetails: async (id: number) => {
        return await useAuthFetch(`/api/survey/${id}`)
      },
      deleteSurvey: async (id: number) => {
        return await useAuthFetch(`/api/admin/surveys/${id}`, {
          method: 'DELETE'
        })
      },
      updateSurvey: async (id: number, body: any) => {
        return await useAuthFetch(`/api/admin/surveys/${id}`, {
          method: 'PUT',
          body
        })
      }
    }
  }
})
