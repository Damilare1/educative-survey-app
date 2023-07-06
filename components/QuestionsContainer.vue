<template>
  <v-container class="mb-8">
    <SurveyConfigDetails
      :is-admin="!!isAdmin"
      :is-active="survey.is_active"
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
      :question="question"
      :preview="!!preview"
      :is-admin="!!isAdmin"
      @delete-question="handleRemoveQuestion(i)"
      @update:responses="(value) => $emit('update:response', value, question.id)"
      :key="question.id ?? `survey_question_${i}`"
      :index="i"
    />
    <v-container v-if="isAdmin && !preview">
      <v-row justify="space-around">
        <v-tooltip text="Add question" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              icon="mdi-plus"
              @click="handleAddButtonClick"
              v-bind="props"
            ></v-btn>
          </template>
        </v-tooltip>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { UnwrapNestedRefs } from "vue";
import { IQuestion } from "~/interfaces/IQuestionOptionProps";
import { ISurvey } from "~/interfaces/ISurvey";

interface IProps {
  isAdmin?: boolean;
  preview?: boolean;
  survey: UnwrapNestedRefs<ISurvey>;
}
const props = defineProps<IProps>();
defineEmits(['update:response'])

const handleAddButtonClick = () => {
  const initial: IQuestion = {
    question: "Untitled Question",
    input_type_id: 1,
    options: [{ label: "Option 1" }],
  };

  props.survey.questions = [...props.survey.questions, initial];
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
