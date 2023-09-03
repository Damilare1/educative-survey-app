<template>
    <NuxtLayout>
    <v-container class="h-100 d-flex flex-column justify-center align-center">
    {{  $props.error }}
      <h1 class="text-center text-h2 w-75">{{ $props?.error?.statusCode }}</h1>
      <h6 class="text-center text-h4 w-75 mt-5">
        {{ $props?.error?.statusMessage }}
      </h6>
      <v-container class="w-50 mt-5">
        <v-row justify="space-around">
          <v-btn to="/admin">Create a Survey</v-btn>
          <v-btn to="/survey">Take a Survey</v-btn>
        </v-row>
      </v-container>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
interface IError {
  statusCode: string
  statusMessage: string
}
interface IErrorProps {
  error?: IError
}
defineProps<IErrorProps>()

</script>
