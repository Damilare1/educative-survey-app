<template>
  <v-container>
    <SurveyConfigDetails
      :is-admin="!!isAdmin"
      :preview="!!preview"
      v-model:is-active="survey.is_active"
    />
    <TitleDescriptionComponent
      v-model:title="survey.survey_name"
      v-model:description="survey.survey_description"
      :is-admin="!!isAdmin"
      :preview="!!preview"
    />
    <QuestionComponent
      v-for="(question, i) in questions"
      :inputOptionTypes="inputTypes"
      :preview="!!preview"
      :is-admin="!!isAdmin"
      v-model:response="questions[i].response.option_id"
      v-model:question="questions[i]"
      @delete-question="handleRemoveQuestion(i)"
      :key="question?.id ?? `survey_question_${i}`"
      :index="i"
    />
  </v-container>
  <v-container v-if="isAdmin && !preview" class="mb-8">
    <v-row justify="space-around">
      <v-tooltip text="Add question" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-plus"
            @click="handleAddButtonClick"
            v-bind="props"
            ref="addButton"
          ></v-btn>
        </template>
      </v-tooltip>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { UnwrapNestedRefs, ref } from "vue";
import { IQuestion } from "../interfaces/IQuestionOptionProps";
import { ISurvey } from "../interfaces/ISurvey";

interface IProps {
  isAdmin?: boolean;
  preview?: boolean;
  survey: UnwrapNestedRefs<ISurvey>;
  inputTypes: any[];
  survey_id?: string;
}
const props = defineProps<IProps>();
const emit = defineEmits(["update:responses", "update:question"]);

const questions: any = reactive([]);

watchEffect(() => {
  const updatedQuestion = props.survey.questions.map((question) => {
    question.response = {
      question_id: question.id,
      survey_id: props.survey.id,
      option_id: "",
    };

    return question;
  });
  Object.assign(questions, updatedQuestion);
});
const handleAddButtonClick = () => {
  const initial: IQuestion = {
    question: "Untitled Question",
    input_type_id: props.inputTypes[0].id,
    options: [{ label: "Option 1" }]
  };

  const temp = [...questions, initial];
  Object.assign(questions, temp);
};

watch(questions, (value) => {
  if (!(props.isAdmin && !props.preview)) {
    emit( "update:responses", value.map((question: any) => question.response) );
  } else {
    emit("update:question", value);
  }
});

const handleRemoveQuestion = (index: number) => {
  questions.splice(index, 1);
};
</script>

<style scoped></style>
