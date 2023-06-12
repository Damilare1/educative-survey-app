export default defineNuxtRouteMiddleware(async () => {
  const { $userIsLoggedIn } = useNuxtApp()
  const { isError } = await $userIsLoggedIn()
  if (isError) {
    return await navigateTo('/login')
  }
})
