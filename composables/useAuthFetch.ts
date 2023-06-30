export const useAuthFetch = async (
  path: string,
  options: any = {}
): Promise<any> => {
  const { $getToken } = useNuxtApp()
  const headers = options.headers ?? {}
  headers.authorization = $getToken()
  options.headers = headers

  return await useFetch(path, options)
}
