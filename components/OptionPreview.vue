<template>
    <v-text-field
      class="option-text-field"
      v-for="(option, i) in optionArray"
      @input="handleOptionTextUpdate($event, i)"
      :model-value="option.label"
      :prepend-icon="selectedOptionIcon"
      append-icon="mdi-close"
      @click:append="handleRemoveOption(i)"
    ></v-text-field>
    <v-btn @click="addNewOption">Add Option</v-btn>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { QuestionOptionsEnum } from "~/enums/QuestionOptions.enums";
import { IMultipleChoiceOptionPreview } from "~/interfaces/IMultipleChoiceOptionPreview";
const icons = {
  [QuestionOptionsEnum.MULTIPLE_CHOICE]: "mdi-radiobox-blank",
  [QuestionOptionsEnum.CHECKBOX]: "mdi-checkbox-blank-outline",
};

const props = defineProps<IMultipleChoiceOptionPreview>();
const optionArray = reactive(props.options);

const selectedOptionIcon = computed(() => {
  return icons[props.optionType];
});

const handleOptionTextUpdate = (
  event: SyntheticInputEvent<HTMLInputElement>,
  index: number
) => {
  const { value } = event.target;
  optionArray[index].label = value;
};

const addNewOption = () => {
  optionArray.push({
    label: `Option ${optionArray.length + 1}`,
    id: optionArray.length + 1,
  });
};

const handleRemoveOption = (index: number) => {
  optionArray.splice(index, 1);
};
</script>

<style scoped>
.option-text-field :deep(input) {
  background-color: #ffffff !important;
}
</style>
