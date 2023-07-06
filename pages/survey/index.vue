<template>
  <v-container class="h-100 d-flex flex-column justify-center">
    <v-text-field v-model="id" label="Find Survey by ID">
      <template v-slot:append>
        <v-btn color="blue" @click="navigateTo(`/survey/${id}`)" h-2> Search </v-btn>
      </template>
    </v-text-field>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'
const id = ref(null)
</script>
