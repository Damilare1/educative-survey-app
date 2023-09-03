<template>
   <component :is="selectedOption"  :options="options" @response="(value) => $emit('response', value)" />
</template>

<script setup lang="ts" >
import { resolveComponent, computed } from "vue";
import { QuestionInputTypesEnum } from "../enums/QuestionInputTypes.enums"
import { IOptionTypeProps } from "../interfaces/IOptionTypes"
const checkBox = resolveComponent("CheckBoxOptionType");
const radioGroup = resolveComponent("RadioGroupOptionType");

const props = defineProps<IOptionTypeProps>();
defineEmits(['response'])
const components = {
  [QuestionInputTypesEnum.CHECKBOX]: checkBox,
  [QuestionInputTypesEnum.MULTIPLE_CHOICE]: radioGroup
}
const selectedOption = computed(() => {
  let component = ""
  if(props.optionType && props.optionTypes){
    component = props.optionTypes.filter((type) => type.id === props.optionType)[0]?.label
  }
  return components[component];
})


</script>

<style scoped></style>
