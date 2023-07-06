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
import { QuestionOptionsEnum } from "~/enums/QuestionOptions.enums";
import { IMultipleChoiceOptionPreview } from "~/interfaces/IMultipleChoiceOptionPreview";
const icons = {
  [QuestionOptionsEnum.MULTIPLE_CHOICE]: "mdi-radiobox-blank",
  [QuestionOptionsEnum.CHECKBOX]: "mdi-checkbox-blank-outline",
};

const props = defineProps<IMultipleChoiceOptionPreview>();

const selectedOptionIcon = computed(() => {
  return icons[props.optionType];
});

const handleOptionTextUpdate = (
  event: SyntheticInputEvent<HTMLInputElement>,
  index: number
) => {
  const { value } = event.target;
  props.options[index].label = value;
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
