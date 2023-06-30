export default defineNuxtRouteMiddleware(async (from, to) => {
  if (process.client) {
    const { $userIsLoggedIn } = useNuxtApp()
    const { pending, error } = await $userIsLoggedIn()

    if (!pending.value && !error.value) {
      return await navigateTo('/')
    }
  }
})
