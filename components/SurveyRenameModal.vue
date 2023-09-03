<template>
  <div class="w-100">
    <v-card class="v-col-12">
      <v-card-title>Rename</v-card-title>
      <v-divider></v-divider>
      <v-card-text> Please enter a new title for the survey </v-card-text>
      <form @submit.prevent="submitForm">
        <v-text-field
          class="mx-4"
          v-model="title"
          label="Title"
          type="text"
          required
          aria-required="true"
        ></v-text-field>
        <v-card-actions>
          <v-row class="ma-0 align-center justify-space-between">
            <v-btn class="me-4" type="submit">Submit</v-btn>
            <v-btn color="primary" @click="$emit('closeDialog')"
              >Close Dialog</v-btn
            >
          </v-row>
        </v-card-actions>
      </form>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useModals } from '../composables/useModals'

const { data: { payload: { text, action } }, toggleDialog } = useModals()
const emit = defineEmits(['closeDialog'])
const title = ref(text)
const submitForm = async () => {
  if (!title.value) { emit('closeDialog') }
  if (action)action(title.value)
  else toggleDialog()
}
</script>
