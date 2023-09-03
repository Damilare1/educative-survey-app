<template>
  <v-checkbox
    v-for="option in options"
    :ref="option.label"
    v-model="selectedItems"
    :label="option.label"
    :value="option.id"
    hide-details
  ></v-checkbox>
</template>

<script setup lang="ts">
import { ref, watch, toRaw } from 'vue'
import { IOptionsProps } from "../interfaces/IOptionTypes";
const selectedItems = ref([])
defineProps<IOptionsProps>();
const emit = defineEmits(["response"]);
watch(selectedItems, ()=> {
  emit("response", toRaw(selectedItems.value))
})
</script>

<style scoped></style>
