<template>
  <v-container>
    <v-row class="survey-field pa-6 mb-4 w-100 d-flex flex-wrap ma-auto">
      <slot />
    </v-row>
  </v-container>
</template>

<script setup></script>

<style lang="scss" scoped>
.survey-field:focus {
    border-top: 10px solid red;
}
</style>
