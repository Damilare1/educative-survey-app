// Import necessary libraries and components
import { createVuetify } from 'vuetify'
import { mount } from '@vue/test-utils'
import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import QuestionOptionsComponent from '../QuestionOptionsComponent.vue'
import { type IOptions } from '../../interfaces/IOptionTypes'

// Describe the suite of tests for the QuestionOptionsComponent
describe('QuestionOptionsComponent', () => {
  let wrapper: any = null
  const vuetify = createVuetify()

  // Sample data for options and option types
  const options: IOptions[] = [
    {
      label: 'Some type',
      id: '1'
    },
    {
      label: 'Some other type',
      id: '2'
    }
  ]
  const optionType = '2'
  const optionTypes = [
    {
      label: 'Multiple Choice',
      id: '1'
    },
    {
      label: 'Check box',
      id: '2'
    }
  ]

  // SETUP - run before each unit test
  beforeEach(async () => {
    // Render the QuestionOptionsComponent with given props and plugins
    wrapper = mount(QuestionOptionsComponent, {
      props: {
        optionType,
        optionTypes,
        options
      },
      global: {
        plugins: [vuetify]
      }
    })
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    // Unmount the wrapper to clean up the component
    wrapper.unmount()
  })

  // Test: The component should render successfully
  test('renders successfully', async () => {
    // Assert that the component wrapper is truthy, indicating successful rendering
    expect(wrapper).toBeTruthy()
  })

  // Test: The radio group option type should render correctly
  test('renders radio group option type correctly', async () => {
    // Change optionType prop to '1' to simulate rendering radio group
    await wrapper.setProps({ optionType: '1' })
    // Assert that the rendered element's tag name matches the expected tag for radio group
    expect(wrapper.element.tagName).toBe('RADIOGROUPOPTIONTYPE')
  })

  // Test: The checkbox option type should render correctly
  test('renders checkbox option type correctly', async () => {
    // Change optionType prop to '2' to simulate rendering checkbox option
    await wrapper.setProps({ optionType: '2' })
    // Assert that the rendered element's tag name matches the expected tag for checkbox option
    expect(wrapper.element.tagName).toBe('CHECKBOXOPTIONTYPE')
  })

  // Test: No component should render for an invalid option type
  test('does not render any component for invalid option type', async () => {
    // Change optionType prop to an empty string to simulate invalid option type
    await wrapper.setProps({ optionType: '' })
    // Assert that the rendered element's tag name is falsy, indicating no rendering
    expect(wrapper.element.tagName).toBeFalsy()
  })
})
