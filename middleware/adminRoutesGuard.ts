import { useAuthState } from '../composables/useAuthState'

export default defineNuxtRouteMiddleware(async () => {
  const authState = useAuthState()
  const { $userIsLoggedIn } = useNuxtApp()
  if (process.server) await $userIsLoggedIn()
  if (!authState.value.isAuthenticated) {
    return navigateTo('/login')
  }
})
