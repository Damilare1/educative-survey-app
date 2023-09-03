<template>
  <v-container v-if="!surveyPending && !inputTypesPending && !error">
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
    <QuestionsContainer
      :is-admin="true"
      :survey="survey"
      :preview="preview"
      :input-types="inputTypes"
    />
  </v-container>
  <v-container
    v-if="!surveyPending && !inputTypesPending && error"
    class="d-flex flex-column justify-center align-center"
  >
    <v-icon class="large-icon" icon="mdi-file-document-alert"></v-icon>
    <h3 class="text-h3">Error loading survey</h3>
  </v-container>
  <v-snackbar :color="flag.color" :timeout="flag.timeout" v-model="flag.show">
    {{ flag.message }}
  </v-snackbar>
  <v-container v-if="surveyPending || inputTypesPending">
    <v-progress-linear indeterminate></v-progress-linear>
  </v-container>
</template>

<script setup lang="ts">
import { UnwrapNestedRefs, reactive, ref, onMounted, nextTick } from "vue";
import { ISurvey } from "../../../../interfaces/ISurvey";
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
const { $getAdminSurveyById, $updateSurvey, $getSurveyInputTypes } =
  useNuxtApp();

const survey: UnwrapNestedRefs<ISurvey> = reactive({
  id: null,
  survey_name: "",
  survey_description: "",
  is_active: false,
  start_date: null,
  end_date: null,
  admin_id: null,
  questions: [],
});

const surveyPending = ref(true);
const inputTypesPending = ref(true);
const inputTypes = ref([]);
const error = ref(null);

const fetchSurvey = async () => {
  const surveyResult = await $getAdminSurveyById(id);
  if (surveyResult.error.value) {
    error.value = surveyResult.error.value;
    setFlag(
      "Error fetching survey, please confirm the survey exists",
      10000,
      "error"
    );
  } else {
    Object.assign(survey, surveyResult.data.value);
  }
  surveyPending.value = false
};

const fetchInputTypes = async () => {
  const surveyInputTypesResult = await $getSurveyInputTypes();
  inputTypes.value = surveyInputTypesResult.data.value;
  inputTypesPending.value = false;
};

onMounted(() => {
  nextTick(async () => {
    await fetchSurvey();
    await fetchInputTypes();
  });
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
