<!-- eslint-disable func-call-spacing -->
<template>
  <NuxtLayout name="surveycard" v-if="!pending && !error && responses">
    <v-container>
      <h3 class="text-h3 mb-6">{{ responses.survey_name }}</h3>
    </v-container>
  </NuxtLayout>
  <ClientOnly>
    <SurveyChart
      v-for="response in responses?.data"
      :key="response.question_id"
      :response="response"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useNuxtApp } from 'nuxt/app'

const { id } = useRoute().params

const { $getResponse } = useNuxtApp()

const pending = ref(true)
const error = ref(null)
const responses = ref({})

onMounted(() => {
  nextTick(async () => {
    const result = await $getResponse(id)
    responses.value = result.data.value
    error.value = result.error.value
    pending.value = result.pending.value
  })
})
</script>

<style scoped></style>
