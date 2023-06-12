<template>
  <NuxtLayout>
    <v-container
      width="400"
      class="mx-auto h-full d-flex w-full align-center justify-center"
      style="height: calc(100%)"
    >
      <v-container class="w-50">
        <form @submit.prevent="submitForm">
          <v-text-field
            v-model="state.email"
            :error-messages="errors.email"
            label="Email"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="state.password"
            :error-messages="errors.password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-row class="ma-0 align-center justify-between">
            <v-btn class="me-4" type="submit">Login</v-btn>
            <NuxtLink to="/signup">Sign up</NuxtLink>
          </v-row>
        </form>
        <v-alert
          class="mt-4"
          v-if="isSuccess || isFailure"
          :type="isSuccess ? 'success' : 'error'"
          :title="isSuccess ? 'Login Successful' : 'Login Failed'"
        ></v-alert>
      </v-container>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { object, string } from 'yup'
const initialState = { email: '', password: '' }
const state = reactive({ ...initialState })
const errors = reactive({ ...initialState })
const isSuccess = ref(false)
const isFailure = ref(false)
const router = useRouter()

const resetErrors = () => {
  Object.assign(errors, initialState)
}
const validate = async (values) => {
  const schema = object().shape({
    password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    email: string()
      .required('Email is required')
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
        'Invalid email address'
      )
  })

  try {
    await schema.validate(values, { abortEarly: false })
    resetErrors()
  } catch (error) {
    // Validation errors occurred
    error.inner.forEach((err) => {
      errors[err.path] = err.message
    })
    return false
  }
  return true
}

const submitForm = async () => {
  isFailure.value = false
  if (!await validate(state)) return
  const { $login } = useNuxtApp()
  const { isError, data } = await $login(state.email, state.password)
  if (isError) {
    if (data) Object.assign(errors, data)
    isSuccess.value = false
    isFailure.value = true
    return
  }
  isSuccess.value = true
  router.push('/admin')
}

</script>
<style scoped></style>
