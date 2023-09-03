<template>
  <div>
    <v-card class="v-col-12">
      <v-card-title>Delete Confirmation</v-card-title>
      <v-divider></v-divider>
      <v-card-text> {{ message }} </v-card-text>
      <v-card-actions>
        <v-row class="ma-0 align-center justify-space-between">
          <v-btn class="me-4" @click="modalCtrl.data.payload.action">Yes</v-btn>
          <v-btn color="primary" @click="$emit('closeDialog')">Cancel</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModals } from '../composables/useModals'
const modalCtrl = useModals()
const message = ref(modalCtrl.data.payload.message ?? 'Are you sure you want to delete this item')
</script>

<style scoped></style>
