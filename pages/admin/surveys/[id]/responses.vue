<!-- eslint-disable func-call-spacing -->
<template>
  <NuxtLayout name="surveycard" v-if="!pending && !error && responses">
    <v-container>
      <h3 class="text-h3 mb-6">{{ responses.survey_name }}</h3>
      <h6 class="text-h6">{{ `Responses: ${responses.count}` }}</h6>
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
import { ref } from "vue";
const { id } = useRoute().params;

const { $getResponse } = useNuxtApp();

const { error, pending, data } = await $getResponse(id);
const responses: Ref<any> = ref({});
watchEffect(() => {
  if (!pending.value && !error.value) {
    responses.value = data.value;
  }
});
</script>

<style scoped></style>
