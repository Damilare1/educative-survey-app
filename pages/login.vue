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
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { object, string } from 'yup'

// eslint-disable-next-line no-undef
definePageMeta({
  middleware: 'auth-routes-guard'
})

const initialState = { email: '', password: '' }
const state = reactive({ ...initialState })
const errors = reactive({ ...initialState })
const isSuccess = ref(false)
const isFailure = ref(false)
const router = useRouter()
const { $login } = useNuxtApp()

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
    error.inner.forEach((validationError) => {
      errors[validationError.path] = validationError.message
    })
    return false
  }
  return true
}

const submitForm = async () => {
  isFailure.value = false
  if (!(await validate(state))) return
  const { error, data, pending } = await $login(state.email, state.password)

  if (!pending.value && error.value) {
    if (data.value) Object.assign(errors, data)
    isSuccess.value = false
    isFailure.value = true
    return
  }
  isSuccess.value = true
  router.push('/admin')
}
</script>
<style scoped></style>
