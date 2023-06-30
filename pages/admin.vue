<template>
    <NuxtLayout name="admin">
        <NuxtPage />
    </NuxtLayout>
</template>
<script setup>
// eslint-disable-next-line no-undef
definePageMeta({
  middleware: 'admin-routes-guard'
})
</script>
