export default defineNuxtRouteMiddleware(async (from, to) => {
  if (process.client) {
    const { $userIsLoggedIn } = useNuxtApp()
    const { isError } = await $userIsLoggedIn()

    if (!isError) {
      return await navigateTo('/')
    }
  }
})
