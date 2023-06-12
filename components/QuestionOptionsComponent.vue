<template>
   <component :is="handleSwitch(optionType)"  :options="options" @response="(value) => $emit('response', value)" />
</template>

<script setup lang="ts">
import { QuestionOptionsEnum } from "~/enums/QuestionOptions.enums"
import { IOptionTypeProps } from "~/interfaces/IOptionTypes"
const checkBox = resolveComponent("CheckBoxOptionType");
const radioGroup = resolveComponent("RadioGroupOptionType");

defineProps<IOptionTypeProps>();
defineEmits(['response'])
const handleSwitch = (value: string): string | ConcreteComponent<any> => {
  switch (value) {
    case QuestionOptionsEnum.CHECKBOX:
      return checkBox;
    case QuestionOptionsEnum.MULTIPLE_CHOICE:
      return radioGroup;
  }
  return "";
};
</script>

<style scoped></style>
