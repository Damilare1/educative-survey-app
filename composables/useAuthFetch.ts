export const useAuthFetch = async (path: string, options: any = {}): Promise<any> => {
  const { $getToken } = useNuxtApp()
  return await useFetch(path, {
    ...options,
    headers: {
      ...options.headers,
      authorization: $getToken()
    }
  })
}
