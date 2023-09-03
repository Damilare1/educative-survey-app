/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { type AsyncData } from 'nuxt/app'
import { useAuthState } from '../composables/useAuthState'
const JWT_LS_TOKEN = 'survey_jwt'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getToken: (): string | null | undefined => {
        if (process.server) {
          const token = useCookie('authToken')
          return token.value
        }
        return nuxtApp.$getItemFromLocalStorage(JWT_LS_TOKEN)
      },
      authFetch: async (path: string, options: any): Promise<AsyncData<any, Error | null>> => {
        const { $getToken } = nuxtApp
        const headers = options.headers ?? {}
        headers.authorization = $getToken() ?? ''
        options.headers = headers
        // don't load on the server because of the token saved in local storage
        options.server = true
        options.lazy = true
        options.baseURL = useRuntimeConfig().public.apiBase

        return await useFetch(path, options)
      },
      login: async function (
        email: string,
        password: string
      ): Promise<AsyncData<any, Error | null>> {
        const authState = useAuthState()
        return await useFetch('/api/auth/login', {
          body: {
            email,
            password
          },
          method: 'POST',
          onResponse: ({ response }) => {
            const data = response._data
            if (data.token) {
              authState.value.userName = data.username
              authState.value.email = data.email
              authState.value.isAuthenticated = true
              const token = useCookie('authToken')
              token.value = data.token
              nuxtApp.$setItemInLocalStorage(JWT_LS_TOKEN, data.token)
            }
          }
        })
      },
      logout: function (): void {
        const authState = useAuthState()
        authState.value.userName = ''
        authState.value.isAuthenticated = false
        nuxtApp.$setItemInLocalStorage(JWT_LS_TOKEN)
        const token = useCookie('authToken')
        token.value = null
      },
      signup: async (
        email: string,
        username: string,
        password: string
      ): Promise<AsyncData<any, Error | null>> => {
        return await useFetch('/api/auth/signup', {
          body: {
            email,
            username,
            password
          },
          method: 'POST'
        })
      },
      update: async (
        email: string,
        username: string,
        oldpassword: string,
        newpassword: string
      ): Promise<AsyncData<any, Error | null>> => {
        const { $authFetch, $deleteItemFromLocalStorage } = nuxtApp

        return $authFetch('/api/auth/update', {
          body: {
            email,
            username,
            oldpassword,
            newpassword
          },
          method: 'PUT'
        })
      },
      userIsLoggedIn: () => {
        const { $authFetch, $deleteItemFromLocalStorage } = nuxtApp
        const authState = useAuthState()
        return $authFetch('/api/auth/isLoggedIn', {
          onResponse ({ response }) {
            if (response.ok) {
              authState.value.userName = response._data.username
              authState.value.email = response._data.email
              authState.value.isAuthenticated = true
            }
          },
          onResponseError ({ response: { status } }) {
            // if token no longer valid, delete from local storage
            if (status === 403) {
              authState.value.userName = ''
              authState.value.isAuthenticated = false
              const token = useCookie('authToken')
              token.value = null
              $deleteItemFromLocalStorage(JWT_LS_TOKEN)
            }
          }
        })
      }
    }
  }
})
