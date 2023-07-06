<template>
  <NuxtLayout name="surveycard">
    <v-container
      class="d-flex flex-column justify-center align-center"
    >
      <v-icon class="large-icon" icon="mdi-file-document-alert"></v-icon>
      <h4 class="text-h4 text-center mt-4">
        Thank you for taking part in the survey, your response has been successfully submitted
      </h4>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style scoped>
.large-icon {
  font-size: 10em;
}
</style>
