<template>
  <NuxtLayout>
    <v-container>
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
      <QuestionsContainer
        :is-admin="isAdmin"
        :survey="survey"
        :preview="preview"
      />
      <NuxtLayout name="surveycard">
        <SurveyCard
          :title="survey.survey_name"
          :description="survey.survey_description"
          :author="survey.author.username"
          :is-admin="isAdmin"
          :id="survey.id"
          :key="survey.id"
          @handle-delete="handleDeleteSurvey"
          @handle-update-title="handleUpdateSurveyTitle"
        />
      </NuxtLayout>
      <v-container>
        <h6 class="text-h6">Response chart</h6>
        <ClientOnly>
          <SurveyChart
            v-for="response in responses"
            :key="response.question_id"
            :response="response"
          />
        </ClientOnly>
      </v-container>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const isAdmin = ref(false)
const preview = ref(false)
const survey = reactive({
  id: 1,
  is_active: true,
  author: { username: 'Lorem' },
  survey_name: 'Sample Survey',
  survey_description:
    'Enter a brief description of your document here. The description \
    should be no more than 240 characters long. It should be informative \
    and give a good overview of the document.',
  questions: [
    {
      id: 0,
      question: 'Lorem Ipsum',
      input_type_id: 1,
      options: [
        {
          id: 0,
          label: 'Lorem ipsum option 1'
        },
        {
          id: 1,
          label: 'Lorem ipsum option 2'
        }
      ]
    }
  ]
})

const responses = ref([
  {
    question: 'Sample question',
    question_id: 7,
    count: 4,
    options: [
      {
        label: 'Sample Option 1',
        option_id: 19,
        count: 5
      },
      {
        label: 'Sample Option 2',
        option_id: 312,
        count: 4
      }
    ]
  }
])
const handleDeleteSurvey = (event) => {
  console.log(event)
}
const handleUpdateSurveyTitle = (event) => {
  console.log(event)
}
</script>

<style scoped></style>
