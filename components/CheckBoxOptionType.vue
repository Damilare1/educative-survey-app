<template>
  <v-checkbox
    v-for="option in options"
    :label="option.label"
    :value="option.id"
    @input="($event) => $emit('response', $event.target.value)"
    hide-details
  ></v-checkbox>
</template>

<script setup lang="ts">
import { IOptionsProps } from "~/interfaces/IOptionTypes";
defineProps<IOptionsProps>();
defineEmits(["response"]);
</script>

<style scoped></style>
