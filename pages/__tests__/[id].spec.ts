import { describe, expect, test } from 'vitest'
import { setup, $fetch, url, fetch } from '@nuxt/test-utils'
/**
 * Setup unit tests for the survey form page
 */
describe('Survey form page tests', async () => {
  await setup({
    server: true
  })

  // Basic test to verify if the survey form page route exists.
  test('Page route exists', async () => {
    const surveyFormPage = url('/survey/12')
    const { status } = await fetch(surveyFormPage)
    expect(status).toBe(200)
  })

//   test('Page component renders', async() => {

//   })

  //   test('check that 1 = 1', async () => {
  //     expect(1).toEqual(1)
  //     expect(1).not.toEqual(2)
  //   })

  //   // Basic test to verify if the admin survey route is set up correctly.
  //   test('Admin survey route exists', async () => {
  //     const adminSurveyPage = url('/admin/survey')
  //     const html = await $fetch(adminSurveyPage)
  //     expect(html).toContain('Something')
  //   })

  //   // Detailed test to verify if the admin specific survey route with dynamic parameters is set up correctly.
  //   test('Admin specific survey route exists', async () => {
  //     const surveyId = 1234
  //     const adminSurveyIdPage = url(`/admin/survey/${surveyId}`)
  //     const html = await $fetch(adminSurveyIdPage)

  //     expect(html).toContain(`Survey with ID: ${surveyId}`)
  //   })

//   // Negative test to verify if non-existent admin routes return a 404 error as expected.
//   test('Admin some random route does not exist', async () => {
//     const adminRandomNonExistentPage = url('/admin/random')
//     let html: string = ''
//     try {
//       html = await $fetch(adminRandomNonExistentPage)
//     } catch (e: any) {
//       html = e.message
//     }
//     expect(html).toContain('404')
//   })
})
