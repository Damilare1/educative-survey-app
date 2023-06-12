<template>
  <NuxtLayout>
    <v-container class="pa-0" style="height: 100%" fluid>
      <v-layout full-height>
        <v-navigation-drawer class="bg-default" theme="dark" expand-on-hover>
          <v-list class="pa-0">
            <v-list-item
              active-class="bg-grey-darken-3"
              prepend-icon="mdi-folder-plus-outline"
              title="My Surveys"
              to="/admin/surveys"
            ></v-list-item>
            <v-list-item
              active-class="bg-grey-darken-3"
              prepend-icon="mdi-list-box-outline"
              title="New Survey"
              to="/admin/surveys/create"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main class="" style="min-height: 100%">
          <v-container class="pa-0 px-10" fluid><slot /></v-container
        ></v-main>
      </v-layout>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style scoped></style>
