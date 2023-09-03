// @vitest-environment nuxt

import { mountSuspended, registerEndpoint } from 'nuxt-vitest/utils'
import { describe, expect, test } from 'vitest'
import { inputTypes, survey } from './mocks/survey'

import App from 'app.vue'
import { flushPromises } from '@vue/test-utils'

/**
 * Setup unit tests for the Admin Routes in the application
 */

// Register mocked endpoints for API requests
registerEndpoint('/api/survey/1/questions', () => survey.data)
registerEndpoint('/api/auth/isLoggedIn', () => ({
  username: 'Lorem 1',
  token: 'user-token',
  email: 'lorem@ipsum.co'
}))
registerEndpoint('/api/survey_input_types', () => inputTypes.data)

// Describe block for Survey Routes
describe('Survey Routes', async () => {
  // Test: Verify if the survey route displays the appropriate components
  test('displays questions for specific survey in survey route', async () => {
    const page = await mountSuspended(App, { route: '/survey/1' })
    await flushPromises()

    const questionComponents = page.findAllComponents({ name: 'QuestionComponent' })
    expect(questionComponents.length).toBe(survey.data.questions.length)
  })
})
