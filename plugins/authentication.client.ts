/* eslint-disable @typescript-eslint/strict-boolean-expressions */

const JWT_LS_TOKEN = 'survey_jwt'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getToken: (): string | null => {
        return nuxtApp.$getItemFromLocalStorage(JWT_LS_TOKEN)
      },
      login: async function (
        email: string,
        password: string
      ): Promise<any> {
        return await useAuthFetch('/api/auth/login', {
          body: {
            email,
            password
          },
          method: 'POST',
          onResponse: ({ response }) => {
            const data = response._data
            if (data.token) {
              nuxtApp.$setItemInLocalStorage(JWT_LS_TOKEN, data.token)
            }
          }
        })
      },
      logout: function (): void {
        nuxtApp.$setItemInLocalStorage(JWT_LS_TOKEN)
      },
      signup: async (
        email: string,
        username: string,
        password: string
      ): Promise<any> => {
        return await useAuthFetch('/api/auth/signup', {
          body: {
            email,
            username,
            password
          },
          method: 'POST'
        })
      },
      userIsLoggedIn: async (): Promise<any> => {
        return await useAuthFetch('/api/auth/isLoggedIn', {
          onResponseError ({ response: { status } }) {
            // if token no longer valid, delete from local storage
            if (status === 403) {
              nuxtApp.$deleteItemFromLocalStorage(JWT_LS_TOKEN)
            }
          }
        })
      }
    }
  }
})
