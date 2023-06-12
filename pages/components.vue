<template>
  <NuxtLayout>
    <v-container fluid>
      <NuxtLayout name="surveycard">
        <v-switch
          color="primary"
          v-model="isAdmin"
          hide-details
          :true-value="true"
          :false-value="false"
          label="isAdmin"
        ></v-switch>
      </NuxtLayout>
      <QuestionsContainer :is-admin="isAdmin" />
      <NuxtLayout name="surveycard">
        <SurveyCard
          :title="survey.title"
          :description="survey.description"
          :author="survey.author"
          :is-admin="isAdmin"
          :id="1"
        />
      </NuxtLayout>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const isAdmin = ref(false)
const survey = reactive({
  author: 'Enter name of survey author here',
  title: 'Enter the title of your survey here.',
  description:
    'Enter a brief description of your document here. The description \
    should be no more than 240 characters long. It should be informative \
    and give a good overview of the document.'
})
</script>

<style scoped></style>
