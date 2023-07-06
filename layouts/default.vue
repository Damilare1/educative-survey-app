<template>
  <v-app style="min-height: 100vh">
    <nav>
      <v-container class="pa-0" fluid>
        <v-row no-gutters>
          <v-col md="1" cols="3">
            <v-btn class="pa-2" width="100%" size="large" to="/" flat
              >Home</v-btn
            >
          </v-col>
          <v-col md="1" cols="3">
            <v-btn class="pa-2" width="100%" size="large" to="/survey" flat
              >Surveys</v-btn
            >
          </v-col>
          <v-col md="1" cols="3">
            <v-btn class="pa-2" width="100%" size="large" to="/about" flat
              >About</v-btn
            >
          </v-col>
          <v-col md="7"></v-col>
          <v-col md="2" cols="3">
          <template v-if="user">
            <v-btn id="menu-activator" class="pa-2" width="100%" size="large" flat>
              Admin
            </v-btn>

            <v-menu activator="#menu-activator">
              <v-list>
                <v-list-item>
                  <v-btn to="/admin/surveys/create" exact>New Survey</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn to="/admin" exact>My Surveys</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn @click="logout">Logout</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-else>
            <v-btn to="/login" class="pa-2" width="100%" size="large" flat>
              Login
            </v-btn>
          </template>
          </v-col>
        </v-row>
      </v-container>
    </nav>
    <v-container class="pa-0" style="min-height: calc(100% - 88px)" fluid>
      <slot />
    </v-container>
    <v-footer class="bg-grey" app>
      <v-row justify="center">
        <v-col class="text-center text-black" cols="12">
          Survey Application
        </v-col>
      </v-row>
    </v-footer>
    <ModalContainer />
  </v-app>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const { $userIsLoggedIn, $logout } = useNuxtApp()
const { error, pending, data } = await $userIsLoggedIn()
const user = ref(null)
watchEffect(() => {
  if (!pending.value && !error.value) {
    user.value = data.value
  }
})

const logout = async () => {
  await $logout()
  user.value = null
  navigateTo('/')
}
</script>
<style scoped></style>
