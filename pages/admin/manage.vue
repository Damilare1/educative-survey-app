<template>
  <v-container>
    <h4 class="text-h4 w-75 mb-6">Account Settings</h4>
    <p class="text-p">
      Please enter your current credentials and the new information you'd like
      to update.
    </p>
    <v-divider class="my-4"></v-divider>
    <form @submit.prevent="submitForm">
      <v-text-field
        label="Email"
        :error-messages="errors.email"
        v-model="adminData.email"
        disabled
        required
      ></v-text-field>
      <v-spacer class="my-6"></v-spacer>
      <h6 class="text-h6 mb-4">Update credentials</h6>
      <v-text-field
        label="Username"
        :error-messages="errors.username"
        v-model="adminData.username"
        required
      ></v-text-field>
      <v-text-field
        label="Current password"
        :error-messages="errors.oldpassword"
        v-model="adminData.oldpassword"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        label="New password"
        :error-messages="errors.newpassword"
        v-model="adminData.newpassword"
        type="password"
        :rules="[minPasswordLength, checkCurrentPasswordHasValue]"
        required
      ></v-text-field>
      <v-text-field
        label="Re-enter new password"
        :error-messages="errors.verify_new_password"
        v-model="adminData.verify_new_password"
        type="password"
        :rules="[matchingPasswords]"
        required
      >
      </v-text-field>
      <v-row class="ma-0 align-center justify-between">
        <v-btn class="me-4" type="submit">Update</v-btn>
      </v-row>
    </form>
  </v-container>
  <v-snackbar :color="flag.color" :timeout="30000" v-model="flag.show">
    {{ flag.message }}
  </v-snackbar>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useAuthState } from '../../composables/useAuthState'
import { object, string, ref } from 'yup'
const router = useRouter()
const authState = useAuthState()
const { $update } = useNuxtApp()

const flag = reactive({
  message: '',
  show: false,
  variant: '',
  color: ''
})

const setFlag = (
  message: string = "Success",
  color: string = "success"
): void => {
  flag.message = message;
  flag.show = true;
  flag.color = color;
};

const initialState = {
  username: '',
  oldpassword: '',
  newpassword: '',
  verify_new_password: '',
  email: ''
}

const adminData = reactive({
  ...initialState,
  email: authState.value.email,
  username: authState.value.userName
})
const errors = reactive({
  ...initialState
})

const validate = async (values) => {
  const schema = object().shape({
    oldpassword: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    newpassword: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    verify_new_password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .oneOf([ref('newpassword')], 'Passwords does not match.'),
    username: string().required('Password is required'),
    email: string()
      .required('Email is required')
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
        'Invalid email address'
      )
  })

  const resetErrors = () => {
    Object.assign(errors, initialState)
  }
  try {
    await schema.validate(values, { abortEarly: false })
    resetErrors()
  } catch (error) {
    // Validation errors occurred
    error.inner.forEach((validationError) => {
      errors[validationError.path] = validationError.message
    })
    setFlag("Error in field values", "error")
    return false
  }
  return true
}
const checkCurrentPasswordHasValue = () => {
  if (!adminData.oldpassword) {
    return 'Enter current password to create new password'
  }
  return true
}

const matchingPasswords = (password) => {
  if (adminData.newpassword !== password) {
    return 'Passwords does not match.'
  }
  return true
}

const minPasswordLength = (password) => {
  if (password.length < 8) {
    return 'Minimum password length is 8'
  }
  return true
}

const submitForm = async () => {
  setFlag("Updating credentials", "blue-grey")
  if (!(await validate(adminData))) return
  const { error, pending } = await $update(
    adminData.email,
    adminData.username,
    adminData.oldpassword,
    adminData.newpassword
  )

  if (!pending.value && error.value) {
    const errorFields = {}
    if (error.value?.data?.data?.fields) {
      for (const field of error.value?.data?.data?.fields) {
        errorFields[field] = 'Invalid value, please recheck'
      }
      if (Object.keys(errorFields).length) Object.assign(errors, errorFields)
    }
    setFlag("Error in submission", "error")
    return
  }
  setFlag("Credentials updated")
  router.push('/admin')
}
</script>
