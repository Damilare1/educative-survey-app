<template>
  <v-container>
    <v-card class="survey-field pa-6 mb-4 w-75 ma-auto">
      <slot />
    </v-card>
  </v-container>
</template>

<script setup></script>

<style lang="scss" scoped>
.survey-field:focus {
    border-top: 10px solid red;
}
</style>
