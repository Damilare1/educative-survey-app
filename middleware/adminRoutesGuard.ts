export default defineNuxtRouteMiddleware(async (from, to) => {
  const { $userIsLoggedIn } = useNuxtApp()
  const { error, pending } = await $userIsLoggedIn()
  if (!pending.value && error.value) {
    return await navigateTo('/login')
  }
})
