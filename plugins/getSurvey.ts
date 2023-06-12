export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getSurvey: async (id: string) => {
        const response = await useFetch(`/api/survey/${id}/questions`)
        return toRaw(response.data.value)
      },
      getSurveyDetails: async (id: string) => {
        const response = await useFetch(`/api/survey/${id}`)
        return toRaw(response.data.value)
      }
    }
  }
})
