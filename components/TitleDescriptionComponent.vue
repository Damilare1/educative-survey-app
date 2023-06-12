<template>
  <NuxtLayout name="surveycard">
    <v-container>
      <template v-if="isAdmin">
        <v-text-field
          :model-value="title"
          class="mb-6"
          label="Survey Title"
          variant="outlined"
          @input="($event)=>$emit('updateTitle', $event.target.value)"
        />
        <v-textarea
          name="input-7-1"
          variant="outlined"
          label="Survey Description"
          :counter="260"
          @input="($event)=>$emit('updateDescription', $event.target.value)"
          :model-value="description"
        />
      </template>
      <template v-else>
        <h3 class="text-h3 mb-6">{{ title }}</h3>
        <h6 class="text-h6">{{ description }}</h6>
      </template>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
interface ITitleProps {
  title: string;
  description: string;
  isAdmin: boolean;
}

defineEmits(['updateTitle', 'updateDescription'])

defineProps<ITitleProps>()
</script>

<style scoped></style>
