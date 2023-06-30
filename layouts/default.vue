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
            <v-btn class="pa-2" width="100%" size="large" to="/admin" flat
              >Admin</v-btn
            >
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
<script lang="ts" setup></script>
<style scoped></style>
