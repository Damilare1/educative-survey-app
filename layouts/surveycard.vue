<template>
    <v-card class="mb-4">
      <v-row class="survey-field pa-6 w-100 align-center d-flex flex-wrap ma-auto">
        <slot />
      </v-row>
    </v-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.survey-field:focus {
  border-top: 10px solid red;
}
</style>
