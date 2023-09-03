<template>
  <v-radio-group @input="($event) => $emit('response', $event.target.value)">
    <v-radio
      v-for="option in options"
      :ref="option.label"
      :label="option.label"
      :value="option.id"
    ></v-radio>
  </v-radio-group>
</template>

<script setup lang="ts">
import { IOptionsProps } from "../interfaces/IOptionTypes";
defineProps<IOptionsProps>();
defineEmits(["response"]);
</script>

<style scoped></style>
