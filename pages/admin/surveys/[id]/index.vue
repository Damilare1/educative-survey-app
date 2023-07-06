<template>
  <v-container v-if="!pending && !error">
    <v-container>
      <NuxtLayout name="surveycard">
        <v-switch
          color="primary"
          v-model="preview"
          hide-details
          :true-value="true"
          :false-value="false"
          label="Preview Survey"
        ></v-switch>
        <v-btn @click="handleUpdateSurvey"> Update Survey </v-btn>
      </NuxtLayout>
    </v-container>
    <QuestionsContainer :is-admin="true" :survey="survey" :preview="preview" />
  </v-container>
  <v-container
    v-if="!pending && error"
    class="d-flex flex-column justify-center align-center"
  >
    <v-icon class="large-icon" icon="mdi-file-document-alert"></v-icon>
    <h3 class="text-h3">Error loading survey</h3>
  </v-container>
  <v-snackbar :color="flag.color" :timeout="flag.timeout" v-model="flag.show">
    {{ flag.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { UnwrapNestedRefs, reactive, ref } from "vue";
import { IQuestion } from "~/interfaces/IQuestionOptionProps";
import { ISurvey } from "~/interfaces/ISurvey";
defineProps({
  isAdmin: Boolean,
});

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
const { id } = useRoute().params;
const { $getAdminSurveyById, $updateSurvey } = useNuxtApp();
const initial: IQuestion = {
  question: "Untitled Question",
  input_type_id: 1,
  options: [{ label: "Option 1" }],
};

const survey: UnwrapNestedRefs<ISurvey> = reactive({
  id: null,
  survey_name: "",
  survey_description: "",
  is_active: false,
  start_date: null,
  end_date: null,
  admin_id: null,
  questions: [initial],
});

const {
  data,
  error,
  pending,
  execute: fetchSurvey,
} = await $getAdminSurveyById(id, {
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

const preview = ref(false);

const handleUpdateSurvey = async (): void => {
  setFlag("Updating survey", 1000, "blue-grey");
  const { error: responseError, pending: loading } = await $updateSurvey(id, {
    body: { ...survey },
    key: "updateSurvey",
  });
  if (!loading.value && responseError.value) {
    setFlag("Error updating Survey", 10000, "error");
  } else if (!loading.value && !responseError.value) {
    setFlag("Survey updated successfully", 5000, "success");
    await fetchSurvey();
  }
};
</script>

<style scoped>
.large-icon {
  font-size: 10em;
}
</style>
