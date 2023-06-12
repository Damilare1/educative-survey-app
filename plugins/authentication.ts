interface IAuthResponse {
  isError: boolean
  data: any
  error: string | null
}

const JWT_TOKEN = 'survey_jwt'
export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getToken: (): string | null => {
        return localStorage.getItem(JWT_TOKEN)
      },
      login: async function (email: string, password: string): Promise<IAuthResponse> {
        const response = await useFetch('/api/auth/login', {
          body: {
            email, password
          },
          method: 'POST'
        })
        const error = toRaw(response.error?.value) ?? null
        if (error === null) {
          const data = response.data.value
          localStorage.setItem(JWT_TOKEN, data.token)
          return {
            isError: false,
            data,
            error: null
          }
        }
        const errorResponse: IAuthResponse = {
          isError: true,
          data: null,
          error: null
        }
        const { statusCode } = error
        if (statusCode === 401) {
          errorResponse.data = error.data?.data ?? error.data
          errorResponse.error = 'Validation Error'
        } else {
          errorResponse.error = 'Server Error'
        }
        return errorResponse
      },
      logout: function (): void {
        localStorage.removeItem(JWT_TOKEN)
      },
      signup: async (email: string, username: string, password: string): Promise<IAuthResponse> => {
        const response = await useFetch('/api/auth/signup', {
          body: {
            email, username, password
          },
          method: 'POST'
        })
        const error = toRaw(response.error?.value) ?? null
        if (error === null) {
          return {
            isError: false,
            data: response.data.value,
            error: null
          }
        }
        const errorResponse: IAuthResponse = {
          isError: true,
          data: null,
          error: null
        }
        const { statusCode } = error
        if (statusCode === 401) {
          errorResponse.data = error.data?.data ?? error.data
          errorResponse.error = 'Validation Error'
        } else {
          errorResponse.error = 'Server Error'
        }
        return errorResponse
      },
      userIsLoggedIn: async (): Promise<IAuthResponse> => {
        const response = await useAuthFetch('/api/auth/isLoggedIn');
        const error = toRaw(response.error?.value) ?? null
        if (error === null) {
          const data = response.data.value
          return {
            isError: false,
            data,
            error: null
          }
        }
        localStorage.removeItem(JWT_TOKEN)
        return {
          isError: true,
          data: error,
          error: error.message
        }
      }
    }
  }
})
