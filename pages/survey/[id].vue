<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ClientOnly>
    <v-container v-if="!pending && !error">
      <h3 class="text-h3">{{ survey.survey_name }}</h3>
      <h6 class="text-h6">{{ survey.survey_description }}</h6>
      <v-container fluid>
        <v-card
          class="mb-10"
          :title="question"
          v-for="{ id, question, options } in survey.questions"
          :key="id"
        >
          <v-card-actions>
            <v-radio-group>
              <v-radio
                :label="label"
                :value="id"
                v-for="{ id, label } in options"
                :key="id"
              ></v-radio>
            </v-radio-group>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-container>
    <v-container v-else>
      <v-text>Loading</v-text>
    </v-container>
  </ClientOnly>
</template>

<script setup lang="ts">
const route = useRoute()
// eslint-disable-next-line no-undef
const { $getSurvey } = useNuxtApp()
const { id } = route.params
const { error, data, pending } = await $getSurvey(id)
const survey = data.value

// eslint-disable-next-line no-undef
useServerSeoMeta({
  title: `Survey Application - ${survey.survey_name}`,
  description: survey.survey_description,
  ogTitle: `Survey Application - ${survey.survey_name}`,
  ogDescription: survey.survey_description,
  twitterTitle: `Survey Application - ${survey.survey_name}`,
  twitterDescription: survey.survey_description
})
</script>

<style scoped></style>
