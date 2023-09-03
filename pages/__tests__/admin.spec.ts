import { mountSuspended, registerEndpoint } from 'nuxt-vitest/utils'
import { describe, expect, test } from 'vitest'
import { adminSurveys } from './mocks/admin'
import { inputTypes, survey, responses } from './mocks/survey'

import App from 'app.vue'
import { flushPromises } from '@vue/test-utils'

/**
 * Setup unit tests for the Admin Routes in the application
 */

// Register mocked endpoints for API requests
registerEndpoint('/api/admin/surveys/1/responses', () => responses.data)
registerEndpoint('/api/admin/surveys/1', () => survey.data)
registerEndpoint('/api/auth/isLoggedIn', () => ({
  username: 'Lorem 1',
  token: 'user-token',
  email: 'lorem@ipsum.co'
}))
registerEndpoint('/api/admin/surveys', () => adminSurveys.data)
registerEndpoint('/api/survey_input_types', () => inputTypes.data)

// Describe block for Admin Routes
describe('Admin Routes', async () => {
  // Test: Verify if the admin route displays the appropriate components
  test('displays admin components on route', async () => {
    const AppPage = await mountSuspended(App, {
      route: '/admin'
    })
    await flushPromises()

    // Check if the necessary components are present on the admin route
    expect(AppPage.html()).toContain('Logout')
    expect(AppPage.html()).toContain('Create Survey')
  })

  // Test: Verify if the admin home page shows a list of surveys
  test('displays list of surveys on admin home page', async () => {
    const page = await mountSuspended(App, { route: '/admin' })
    await flushPromises()

    // Check if the correct number of SurveyCard components are rendered
    expect(page.findAllComponents({ name: 'SurveyCard' }).length).toBe(
      adminSurveys.data.length
    )
  })

  // Test:Verify if the admin survey creation route renders and has the questions container
  test('redirects to questions container when survey creation button clicked', async () => {
    const page = await mountSuspended(App, { route: '/admin/surveys/create' })
    await flushPromises()

    // Check if the page contains the expected content
    expect(page.html()).toContain('Create Survey')
    // Check if QuestionsContainer is rendered and QuestionComponent is not
    expect(page.findAllComponents({ name: 'QuestionsContainer' }).length).toBe(1)
    expect(page.findAllComponents({ name: 'QuestionComponent' }).length).toBe(0)
  })

  // Test: Verify if the admin specific survey route displays questions
  test('displays questions for specific survey in admin route', async () => {
    const page = await mountSuspended(App, { route: '/admin/surveys/1' })
    await flushPromises()
    await flushPromises()

    // Check if the correct number of QuestionComponent instances are rendered
    expect(page.findAllComponents({ name: 'QuestionComponent' }).length).toBe(
      survey.data.questions.length
    )
  })

  // Test: Verify if the admin responses route displays survey name and chart
  test('displays survey name and chart on admin responses route', async () => {
    const page = await mountSuspended(App, {
      route: '/admin/surveys/1/responses'
    })
    await flushPromises()

    // Check if the page contains the survey name and SurveyChart components
    expect(page.html()).toContain(responses.data.survey_name)
    expect(
      page.findAllComponents({ name: 'SurveyChart' }).length
    ).toBeGreaterThan(0)
  })
})
