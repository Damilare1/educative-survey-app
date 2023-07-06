<template>
  <NuxtLayout name="surveycard" v-if="isAdmin && !preview">
    <v-container>
      <v-switch
        color="primary"
        hide-details
        :true-value="true"
        :false-value="false"
        label="Survey is ready to accept responses?"
        v-model="isActiveSwitch"
      ></v-switch>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
interface IConfigDetailsProps {
  isActive: boolean;
  isAdmin: boolean;
  preview: boolean;
}

const emits = defineEmits(["update:is-active"]);

const props = defineProps<IConfigDetailsProps>();
const isActiveSwitch = ref(props.isActive);

watch(isActiveSwitch, () => {
  emits("update:is-active", isActiveSwitch.value);
});
</script>

<style scoped></style>
