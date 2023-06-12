<template>
  <v-container>
    <TitleDescriptionComponent
      :title="survey.title"
      :description="survey.description"
      :is-admin="isAdmin"
      @update-title="handleTitleChange"
      @update-description="handleDescriptionChange"
    />
    <QuestionComponent
      v-for="(question, i) in questions"
      :question="question"
      :is-admin="isAdmin"
      @delete-question="handleRemoveQuestion(i)"
    />
  </v-container>
  <v-container v-if="isAdmin">
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
</template>

<script setup lang="ts">
import { reactive, UnwrapNestedRefs, watch } from "vue";
import { IQuestion } from "~/interfaces/IQuestionOptionProps";
defineProps({
  isAdmin: Boolean,
});
const survey = reactive({
  author: "Enter name of survey author here",
  title: "Enter the title of your survey here.",
  description:
    "Enter a brief description of your document here. The description \
    should be no more than 240 characters long. It should be informative \
    and give a good overview of the document.",
});

const handleDescriptionChange = (value: string): void => {
  survey.description = value;
};

const handleTitleChange = (value: string): void => {
  survey.title = value;
};

const initial = {
  title: "Untitled Question",
  options: [{ label: "Option 1", id: 1 }],
};
const optionInitial = { label: "Option 1", id: 1 };
const questions: UnwrapNestedRefs<IQuestion[]> = reactive([
  { ...initial, options: [{ ...optionInitial }] },
]);

const handleAddButtonClick = () => {
  questions.push({ ...initial, options: [{ ...optionInitial }] });
};

const handleRemoveQuestion = (index: number) => {
  questions.splice(index, 1);
};

watch(questions, (value) => {
  console.log(toRaw(value));
});
</script>

<style scoped></style>
