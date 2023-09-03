<template>
  <v-container class="d-flex justify-end">
    <v-btn to="/admin/surveys/create">Create Survey</v-btn>
  </v-container>
  <v-container v-if="!pending && !error">
    <NuxtLayout name="surveycard">
      <SurveyCard
        v-for="survey in surveys"
        :title="survey.survey_name"
        :description="survey.survey_description"
        :author="survey?.author?.username"
        :is-admin="true"
        :id="survey.id"
        :key="survey.id"
        @handle-delete="handleDeleteSurvey"
        @handle-update-title="handleUpdateSurveyTitle"
      />
    </NuxtLayout>
  </v-container>
  <v-container v-if="pending">
    <v-progress-linear indeterminate></v-progress-linear>
  </v-container>
  <NuxtLayout name="surveycard" v-if="!pending && error">
    <v-container
      class="d-flex flex-column justify-center align-center"
    >
      <v-icon class="large-icon" icon="mdi-file-document-alert"></v-icon>
      <h4 class="text-h4 text-center mt-4">Error loading surveys</h4>
    </v-container>
  </NuxtLayout>
</template>
<script setup>
import { onMounted, nextTick, ref, reactive } from 'vue'
const { $getAdminSurveys, $deleteSurvey, $updateSurvey } = useNuxtApp()
let result = reactive({})

const modalCtrl = useModals()
const surveys = ref([])
const error = ref()
const pending = ref(false)
const fetchSurveys = async () => {
  result = await $getAdminSurveys()
  surveys.value = result.data.value
  error.value = result.error.value
  pending.value = result.pending.value
}

onMounted(async () => {
  nextTick(async () => {
    await fetchSurveys()
  })
})

const handleDeleteSurvey = async (id) => {
  await $deleteSurvey(id)
  await fetchSurveys()
  modalCtrl.toggleDialog()
}

const handleUpdateSurveyTitle = async (id, title) => {
  await $updateSurvey(id, { body: { survey_name: title } })
  await fetchSurveys()
  modalCtrl.toggleDialog()
}
</script>
