<template>
  <NuxtLayout name="surveycard">
    <v-container class="position-relative">
      <template v-if="isAdmin && !preview">
        <v-row align="center" class="pa-4">
          <v-text-field
            class="v-col-sm-8 pa-0 mr-4"
            hide-details="auto"
            v-model="questionData.question"
          ></v-text-field>
          <MenuWithIcons
            :items="inputOptionTypes"
            @item-selected="handleInputTypeSelect"
            :selected-item-id="questionData.input_type_id"
          />
        </v-row>
        <OptionPreview
          :option-type="questionData.input_type_id"
          :option-types="inputOptionTypes"
          :options="questionData.options"
          :question-index="index"
        />
        <v-row class="position-absolute mr-4" style="right: 0; bottom: 1.5rem">
          <v-tooltip text="Delete question" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                icon="mdi-trash-can-outline"
                @click="$emit('deleteQuestion')"
                v-bind="props"
              ></v-btn>
            </template>
          </v-tooltip>
        </v-row>
      </template>
      <template v-else>
        <p class="text-h6 mb-4">{{ questionData.question }}</p>
        <QuestionOptionsComponent
          :option-type="questionData.input_type_id"
          :option-types="inputOptionTypes"
          :options="questionData.options"
          v-model:response="response"
        />
      </template>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import {
  IQuestion,
  IQuestionOptionProps,
} from "../interfaces/IQuestionOptionProps";

const response = ref("");
const props = defineProps<IQuestionOptionProps>();
const emit = defineEmits([
  "deleteQuestion",
  "update:response",
  "update:question",
]);
const selectedInputType = computed(() => {
  if (props.inputOptionTypes && props.question.input_type_id) {
    return (
      props.inputOptionTypes?.filter(
        (type) => type.id === props.question.input_type_id
      )[0] ??
      props?.inputOptionTypes[0] ??
      ""
    );
  }
  return null;
});

const questionData: IQuestion = reactive({
  question: props.question.question,
  input_type_id: selectedInputType?.value?.id,
  options: props.question.options,
});

const handleInputTypeSelect = (input: string) => {
  questionData.input_type_id = input;
};

watch(questionData, (value) => {
  emit("update:question", { ...props.question, ...value });
});

watch(response, (value) => {
  emit("update:response", value);
});
</script>

<style scoped></style>
