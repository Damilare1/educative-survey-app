<template>
    <v-text-field
      class="option-text-field"
      v-for="(option, i) in props.options"
      @input="handleOptionTextUpdate($event, i)"
      :model-value="option.label"
      :prepend-icon="selectedOptionIcon"
      append-icon="mdi-close"
      @click:append="handleRemoveOption(i)"
      :key="`survey_question_${questionIndex}_option_${i}`"
    ></v-text-field>
    <v-btn @click="addNewOption">Add Option</v-btn>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { QuestionInputTypesEnum } from "../enums/QuestionInputTypes.enums";
import { IMultipleChoiceOptionPreview } from "../interfaces/IMultipleChoiceOptionPreview";
const icons = {
  [QuestionInputTypesEnum.MULTIPLE_CHOICE]: "mdi-radiobox-blank",
  [QuestionInputTypesEnum.CHECKBOX]: "mdi-checkbox-blank-outline",
};

const props = defineProps<IMultipleChoiceOptionPreview>();

const selectedOptionIcon = computed(() => {
  if(props.optionTypes && props.optionType) {
    const option = props.optionTypes.filter((type) => type.id === props.optionType)[0].label
    return icons[option]
  }
  return null
})

const handleOptionTextUpdate = (
  event: SyntheticInputEvent<HTMLInputElement>,
  index: number
) => {
  props.options[index].label = event.target.value;
};

const addNewOption = () => {
  props.options.push({
    label: `Option ${props.options.length + 1}`
  });
};

const handleRemoveOption = (index: number) => {
  props.options.splice(index, 1);
};
</script>

<style scoped>
.option-text-field :deep(input) {
  background-color: #ffffff !important;
}
</style>
