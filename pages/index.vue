<template>
  <NuxtLayout>
    <v-container class="h-100 d-flex flex-column justify-center align-center">
      <h2 class="text-center text-h2 w-75">Survey Application</h2>
      <h4 class="text-center text-h4 w-75 mt-5">
        The best application for both creating and taking engaging research
        surveys.
      </h4>
      <v-container class="w-50 mt-5">
        <v-row justify="space-around">
        <ClientOnly fallback-tag="p" fallback="Loading Buttons">
          <v-btn to="/admin">Create a Survey</v-btn>
          <v-btn to="/surveys">Take a Survey</v-btn>
        </ClientOnly>
        </v-row>
      </v-container>
    </v-container>
  </NuxtLayout>
</template>
<script setup></script>
