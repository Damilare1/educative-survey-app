<template>
  <v-container v-if="!pending && !error">
    <NuxtLayout name="surveycard">
      <SurveyCard
        v-for="survey in surveys"
        :title="survey.survey_name"
        :description="survey.survey_description"
        :author="survey.author"
        :is-admin="true"
        :id="survey.id"
        :key="survey.id"
        @handle-delete="handleDeleteSurvey"
        @handle-update-title="handleUpdateSurveyTitle"
      />
    </NuxtLayout>
  </v-container>
</template>
<script setup>
const { $getAdminSurveys, $deleteSurvey, $updateSurvey } = useNuxtApp()
const modalCtrl = useModals()

const { error, data: surveys, pending, refresh: pullSurveys } = await $getAdminSurveys()

const handleDeleteSurvey = async (id) => {
  await $deleteSurvey(id)
  await pullSurveys()
  modalCtrl.toggleDialog()
}

const handleUpdateSurveyTitle = async (id, title) => {
  await $updateSurvey(id, { survey_name: title })
  await pullSurveys()
  modalCtrl.toggleDialog()
}
</script>
