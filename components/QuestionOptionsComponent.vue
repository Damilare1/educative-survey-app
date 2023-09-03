<template>
   <component :is="selectedOption"  :options="options" v-model="response" />
</template>

<script setup lang="ts" >
import { resolveComponent, computed, ref } from "vue";
import { QuestionInputTypesEnum } from "../enums/QuestionInputTypes.enums"
import { IOptionTypeProps } from "../interfaces/IOptionTypes"
const checkBox = resolveComponent("CheckBoxOptionType");
const radioGroup = resolveComponent("RadioGroupOptionType");
const response = ref("");
const props = defineProps<IOptionTypeProps>();
const emits = defineEmits(['update:response'])
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

watch (response, (value) => {
  emits("update:response", value)
})

</script>

<style scoped></style>
