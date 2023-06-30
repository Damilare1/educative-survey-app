<template>
    <NuxtLayout>
      <v-container
        width="400"
        class="mx-auto h-full d-flex w-full align-center justify-center"
        style="height: calc(100%)"
      >
        <v-container class="w-50">
            <slot />
        </v-container>
      </v-container>
    </NuxtLayout>
</template>
<script lang="ts" setup>
</script>
<style scoped></style>
