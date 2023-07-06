<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container v-if="!submitted && !pending && !error && survey.is_active">
    <QuestionsContainer :survey="survey" @update:response="handleResponse" />
    <v-container v-if="!isAdmin">
      <v-row justify="space-around">
        <v-tooltip text="Submit" location="top">
          <template v-slot:activator="{ props }">
            <v-btn @click="submitResponse" v-bind="props"
              >Submit Response</v-btn
            >
          </template>
        </v-tooltip>
      </v-row>
    </v-container>
  </v-container>
  <NuxtLayout name="surveycard" v-if="!pending && (error || !survey.is_active)">
    <v-container
      class="d-flex flex-column justify-center align-center"
    >
      <v-icon class="large-icon" icon="mdi-file-document-alert"></v-icon>
      <h4 class="text-h4 text-center mt-4">{{ error ? "Error loading survey" : "The requested survey is not accepting responses at this time"}}</h4>
    </v-container>
  </NuxtLayout>

  <v-container v-if="pending">
    <h4 class="text-h4">Loading</h4>
  </v-container>
  <NuxtLayout name="surveycard" v-if="submitted && !pending && !error">
    <v-container
      class="d-flex flex-column justify-center align-center"
    >
      <v-icon class="large-icon" icon="mdi-check"></v-icon>
      <h4 class="text-h4 text-center mt-4">
        Thank you for taking part in the survey, your response has been successfully submitted
      </h4>
    </v-container>
  </NuxtLayout>
  <v-snackbar :color="flag.color" :timeout="flag.timeout" v-model="flag.show">
    {{ flag.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { UnwrapNestedRefs, reactive, ref } from "vue";
import { ISurvey } from "~/interfaces/ISurvey";

const route = useRoute();
const submitted = ref(false)

// eslint-disable-next-line no-undef
const { $getSurvey, $createResponse } = useNuxtApp();
const { id } = route.params;
const survey: UnwrapNestedRefs<ISurvey> = reactive({});
const response: any = {};
const flag = reactive({
  message: "",
  show: false,
  variant: "",
  timeout: 2000,
  color: "",
});

const setFlag = (
  message: string = "Success",
  timeout: number = 2000,
  color: string = "success"
): void => {
  flag.message = message;
  flag.show = true;
  flag.timeout = timeout;
  flag.color = color;
};

const { error, data, pending } = await $getSurvey(id, {
  key: "fetchSurvey",
});

watchEffect(() => {
  if (!pending.value && error.value) {
    setFlag(
      "Error fetching survey, please confirm the survey exists",
      10000,
      "error"
    );
  }
  if (!pending.value && data.value) {
    const { value: response } = data;
    response.is_active = !!response.is_active;
    Object.assign(survey, response);
  }
});

const handleResponse = (option_id: number, question_id: number) => {
  response[question_id] = {
    question_id,
    option_id: option_id,
    survey_id: id,
  };
};

const submitResponse = async () => {
  const payload = { responses: Object.values(response) };
  const { error, data } = await $createResponse({ body: payload });
  if (error.value) {
    setFlag(
      "Error submitting response, please try again later",
      10000,
      "error"
    );
    return;
  }
  submitted.value = true
};

// eslint-disable-next-line no-undef
useServerSeoMeta({
  title: `Survey Application - ${survey.survey_name}`,
  description: survey.survey_description,
  ogTitle: `Survey Application - ${survey.survey_name}`,
  ogDescription: survey.survey_description,
  twitterTitle: `Survey Application - ${survey.survey_name}`,
  twitterDescription: survey.survey_description,
});
</script>

<style scoped>
.large-icon {
  font-size: 10em;
}
</style>
