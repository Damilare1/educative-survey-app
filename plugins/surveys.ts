export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getSurvey: async (id: number, options: any = {}) => {
        return await useFetch(`/api/survey/${id}/questions`, {
          ...options,
          lazy: true
        })
      },
      getSurveyInputTypes: async (id: number, options: any = {}) => {
        return await useFetch('/api/survey_input_types', {
          ...options,
          lazy: true
        })
      },
      getAdminSurveys: async (options: any = {}) => {
        return await nuxtApp.$authFetch('/api/admin/surveys', options)
      },
      getAdminSurveyById: async (id: number, options: any = {}) => {
        return await nuxtApp.$authFetch(`/api/admin/surveys/${id}`, options)
      },
      getSurveyDetails: async (id: number, options: any = {}) => {
        return await useFetch(`/api/survey/${id}`, {
          ...options,
          lazy: true
        })
      },
      deleteSurvey: async (id: number, options: any = {}) => {
        return nuxtApp.$authFetch(`/api/admin/surveys/${id}`, {
          ...options,
          method: 'DELETE'
        })
      },
      updateSurvey: async (id: number, options: any = {}) => {
        return nuxtApp.$authFetch(`/api/admin/surveys/${id}`, {
          ...options,
          method: 'PUT'
        })
      },
      createSurvey: async (options: any) => {
        return nuxtApp.$authFetch('/api/admin/surveys/create', {
          ...options,
          method: 'POST'
        })
      }
    }
  }
})
