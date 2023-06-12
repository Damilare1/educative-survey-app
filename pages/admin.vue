<template>
    <NuxtLayout name="admin">
        <NuxtPage />
    </NuxtLayout>
</template>
<script setup>
definePageMeta({
  middleware: [
    'authentication'
  ]
})
</script>
