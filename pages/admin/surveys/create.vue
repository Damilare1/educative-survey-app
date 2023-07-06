<template>
  <v-container>
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
        <v-btn @click="handleCreateSurvey"> Create Survey </v-btn>
      </NuxtLayout>
    </v-container>
    <QuestionsContainer :is-admin="true" :survey="survey" :preview="preview" />
  </v-container>
  <v-snackbar :color="flag.color" :timeout="flag.timeout" v-model="flag.show">
    {{ flag.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { UnwrapNestedRefs } from "vue";
import { reactive, ref } from "vue";
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

const { $createSurvey } = useNuxtApp();
const initial: IQuestion = {
  question: "Untitled Question",
  input_type_id: 1,
  options: [{ label: "Option 1" }],
};

const survey: UnwrapNestedRefs<ISurvey> = reactive({
  survey_name: "New Survey",
  survey_description: "Sample Survey Description",
  is_active: false,
  start_date: null,
  end_date: null,
  questions: [initial],
});

const preview = ref(false);

const handleCreateSurvey = async (): void => {
  setFlag("Creating survey", 1000, "blue-grey");
  const { pending, error } = await $createSurvey({
    body: toRaw(survey),
  });
  if (!pending.value && error.value) {
    setFlag("Error creating survey", 5000, "error");
  }
  if (!pending.value && !error.value) {
    setFlag("Survey created", 5000, "success");
  }
};
</script>

<style scoped>
.large-icon {
  font-size: 10em;
}
</style>
