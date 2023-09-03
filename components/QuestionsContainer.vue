<template>
  <v-container>
    <SurveyConfigDetails
      :is-admin="!!isAdmin"
      :is-active="!!survey.is_active"
      :preview="!!preview"
      @update:is-active="handleConfigChange"
    />
    <TitleDescriptionComponent
      :title="survey.survey_name"
      :description="survey.survey_description"
      :is-admin="!!isAdmin"
      :preview="!!preview"
      @update:title="handleTitleChange"
      @update:description="handleDescriptionChange"
    />
    <QuestionComponent
      v-for="(question, i) in survey.questions"
      :inputOptionTypes="inputTypes"
      :question="question"
      :preview="!!preview"
      :is-admin="!!isAdmin"
      @delete-question="handleRemoveQuestion(i)"
      @update:question="(question) => handleUpdateQuestion(i, question)"
      @update:responses="
        (value) =>
          $emit('update:response', {
            [question.id ?? `survey_question_${i}`]: value,
          })
      "
      :key="question.id ?? `survey_question_${i}`"
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
import { UnwrapNestedRefs } from "vue";
import { IQuestion } from "../interfaces/IQuestionOptionProps";
import { ISurvey } from "../interfaces/ISurvey";

interface IProps {
  isAdmin?: boolean;
  preview?: boolean;
  survey: UnwrapNestedRefs<ISurvey>;
  inputTypes: any[];
}
const props = defineProps<IProps>();
defineEmits(["update:response"]);

const handleAddButtonClick = () => {
  const initial: IQuestion = {
    question: "Untitled Question",
    input_type_id: props.inputTypes[0].id,
    options: [{ label: "Option 1" }],
  };

  props.survey.questions = [...props.survey.questions, initial];
};

const handleUpdateQuestion = (index: number, question: IQuestion) => {
  props.survey.questions[index] = question;
};

const handleRemoveQuestion = (index: number) => {
  props.survey.questions.splice(index, 1);
};

const handleDescriptionChange = (value: string): void => {
  props.survey.survey_description = value;
};

const handleTitleChange = (value: string): void => {
  props.survey.survey_name = value;
};

const handleConfigChange = (value: boolean): void => {
  props.survey.is_active = value;
};
</script>

<style scoped></style>
