export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getItemFromLocalStorage: (key: string): string | null => {
        if (process.server) return null
        return localStorage.getItem(key)
      },
      setItemInLocalStorage: (key: string, value: string): string | null => {
        if (process.server) return null
        localStorage.setItem(key, value)
        return key
      },
      deleteItemFromLocalStorage: (key: string): boolean | null => {
        if (process.server) return null
        localStorage.removeItem(key)
        return true
      }
    }
  }
})
