export default defineNuxtRouteMiddleware(async (from, to) => {
  if (process.client) {
    const { $userIsLoggedIn } = useNuxtApp()
    const { error, pending } = await $userIsLoggedIn()
    if (!pending.value && error.value) {
      return await navigateTo('/login')
    }
  }
})
