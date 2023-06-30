<template>
  <ClientOnly>
    <NuxtLayout name="authentication">
      <form @submit.prevent="submitForm">
        <v-text-field
          v-model="state.email"
          :error-messages="errors.email"
          label="Email"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="state.username"
          :error-messages="errors.username"
          label="Username"
          type="text"
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
          <v-btn class="me-4" type="submit">Sign up</v-btn>
          <NuxtLink to="/login">Login</NuxtLink>
        </v-row>
      </form>
      <v-alert
        class="mt-4"
        v-if="isSuccess || isFailure"
        :type="isSuccess ? 'success' : 'error'"
        :title="isSuccess ? 'Signup Successful' : serverErrorText"
      ></v-alert>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { object, string } from 'yup'
const initialState = { email: '', password: '', username: '' }
const state = reactive({ ...initialState })
const errors = reactive({ ...initialState })
const isSuccess = ref(false)
const isFailure = ref(false)
const serverErrorText = ref('')
const router = useRouter()
const { $signup } = useNuxtApp()

// eslint-disable-next-line no-undef
definePageMeta({
  middleware: ['auth-routes-guard']
})

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
      ),
    username: string()
      .required('Username is required')
      .min(2, 'Username must be at least 2 characters')
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
  if (!(await validate(state))) return
  const response = await $signup(state.email, state.username, state.password)

  if (response.isError && response.error) {
    serverErrorText.value = response.error
    if (response.data) Object.assign(errors, response.data)
    isSuccess.value = false
    isFailure.value = true
    return
  }

  isSuccess.value = true
  router.push('/login')
}
</script>
<style scoped></style>
