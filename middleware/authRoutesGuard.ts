export default defineNuxtRouteMiddleware(async (from, to) => {
  const authState = useAuthState()
  const { $userIsLoggedIn } = useNuxtApp()
  if (process.server) await $userIsLoggedIn()
  if (authState.value.isAuthenticated) {
    return navigateTo('/')
  }
})
