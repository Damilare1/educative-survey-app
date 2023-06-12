import { describe, expect, test } from 'vitest'
import { setup, $fetch, url } from '@nuxt/test-utils'

/**
 * Setup unit tests for all the Admin Routes in the application
 */
describe('Admin Routes', async () => {
  await setup({
    server: true,
    rootDir: '@'
  })

  // Basic test to verify if the admin route is set up correctly.
  test('Admin route exists', async () => {
    const adminPage = url('/admin')
    const html = await $fetch(adminPage)
    expect(html).toContain('Admin Page')
  })

  test('check that 1 = 1', async () => {
    expect(1).toEqual(1)
    expect(1).not.toEqual(2)
  })

  // Basic test to verify if the admin survey route is set up correctly.
  test('Admin survey route exists', async () => {
    const adminSurveyPage = url('/admin/survey')
    const html = await $fetch(adminSurveyPage)
    expect(html).toContain('Something')
  })

  // Detailed test to verify if the admin specific survey route with dynamic parameters is set up correctly.
  test('Admin specific survey route exists', async () => {
    const surveyId = 1234
    const adminSurveyIdPage = url(`/admin/survey/${surveyId}`)
    const html = await $fetch(adminSurveyIdPage)

    expect(html).toContain(`Survey with ID: ${surveyId}`)
  })

  // Negative test to verify if non-existent admin routes return a 404 error as expected.
  test('Admin some random route does not exist', async () => {
    const adminRandomNonExistentPage = url('/admin/random')
    let html: string = ''
    try {
      html = await $fetch(adminRandomNonExistentPage)
    } catch (e: any) {
      html = e.message
    }
    expect(html).toContain('404')
  })
})
