/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { type AsyncData } from 'nuxt/app'

const JWT_LS_TOKEN = 'survey_jwt'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getToken: (): string | null => {
        return nuxtApp.$getItemFromLocalStorage(JWT_LS_TOKEN)
      },
      authFetch: async (path: string, options: any): Promise<AsyncData<any, Error | null>> => {
        const { $getToken } = nuxtApp
        const headers = options.headers ?? {}
        headers.authorization = $getToken() ?? ''
        options.headers = headers
        // don't load on the server because of the token saved in local storage
        options.server = false
        options.lazy = true

        return await useFetch(path, options)
      },
      login: async function (
        email: string,
        password: string
      ): Promise<AsyncData<any, Error | null>> {
        return await useFetch('/api/auth/login', {
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
      userIsLoggedIn: () => {
        const { $authFetch, $deleteItemFromLocalStorage } = nuxtApp
        return $authFetch('/api/auth/isLoggedIn', {
          onResponseError ({ response: { status } }) {
            // if token no longer valid, delete from local storage
            if (status === 403) {
              $deleteItemFromLocalStorage(JWT_LS_TOKEN)
            }
          }
        })
      }
    }
  }
})
