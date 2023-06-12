<template>
  <NuxtLayout name="surveycard">
    <v-container>
      <template v-if="isAdmin">
        <v-row align="center" class="pa-4">
          <v-text-field
            class="v-col-sm-8 pa-0 mr-4"
            hide-details="auto"
            v-model="question.title"
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
        <p class="text-h6 mb-4">{{ question.title }}</p>
        <QuestionOptionsComponent
          :option-type="selectedOption"
          :options="question.options"
          @response="(value) => console.log(value)"
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
defineEmits(['deleteQuestion'])
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
