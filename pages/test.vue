<template>
  <NuxtLayout>
    <v-container class="h-100 d-flex flex-column justify-center">
        <p>Result from <code>/api/hello/?id=12&amp;site_name=google</code> request: {{resultFromApiRequestWithQuery}}</p>
        <p>Result from <code>/api/hello/123</code> request: {{resultFromApiRequestWithParam}}</p>
        <p>Result from <code>/api/hello/123/Lorem</code> request: {{resultFromApiRequestWithParams}}</p>
    </v-container>
  </NuxtLayout>
</template>
<script setup>
const resultFromApiRequestWithQuery = (await useFetch('/api/hello/?id=12&site_name=google')).data
const resultFromApiRequestWithParam = (await useFetch('/api/hello/123')).data
const resultFromApiRequestWithParams = (await useFetch('/api/hello/123/Lorem').data
)
</script>
