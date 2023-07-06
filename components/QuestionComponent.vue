<template>
  <NuxtLayout name="surveycard" >
    <v-container class="position-relative">
      <template v-if="isAdmin && !preview">
        <v-row align="center" class="pa-4">
          <v-text-field
            class="v-col-sm-8 pa-0 mr-4"
            hide-details="auto"
            v-model="question.question"
          ></v-text-field>
          <MenuWithIcons
            :items="optionTypeList"
            @item-selected="handleOptionSelect"
            :selected="selectedOption"
          />
        </v-row>
        <OptionPreview
          :option-type="selectedOption"
          :options="question.options"
          :question-index="index"
        />
        <v-row class="position-absolute mr-4" style="right: 0; bottom: 1.5rem">
          <v-tooltip text="Delete question" location="top">
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-trash-can-outline" @click="$emit('deleteQuestion')" v-bind="props"></v-btn>
            </template>
          </v-tooltip>
        </v-row>
      </template>
      <template v-else>
        <p class="text-h6 mb-4">{{ question.question }}</p>
        <QuestionOptionsComponent
          :option-type="selectedOption"
          :options="question.options"
          @response="(value) => $emit('update:responses', value)"
        />
      </template>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { QuestionOptionsEnum } from "~/enums/QuestionOptions.enums";
import { ref } from "vue";
import { IQuestionOptionProps } from "~/interfaces/IQuestionOptionProps";

const props = defineProps<IQuestionOptionProps>();
defineEmits(['deleteQuestion', 'update:responses'])
const optionTypeList = [
  {
    label: QuestionOptionsEnum.MULTIPLE_CHOICE,
    icon: "mdi-radiobox-marked",
  },
  {
    label: QuestionOptionsEnum.CHECKBOX,
    icon: "mdi-checkbox-outline",
  },
];

const selectedOption = ref(optionTypeList[0].label);

const handleOptionSelect = (option: QuestionOptionsEnum) => {
  selectedOption.value = option;
};

</script>

<style scoped></style>
