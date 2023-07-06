export const useAuthFetch = async (
  path: string,
  options: any = {}
): Promise<any> => {
  const { $getToken } = useNuxtApp()
  const headers = options.headers ?? {}
  headers.authorization = $getToken() ?? ''
  options.headers = headers
  // don't load on the server because of the token saved in local storage
  options.server = false
  options.lazy = true

  return await useFetch(path, options)
}
