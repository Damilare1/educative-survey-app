// Import necessary libraries and components
import { createVuetify } from 'vuetify'
import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CheckBoxOptionTypeVue from '../CheckBoxOptionType.vue'
import { type IOptions } from '../../interfaces/IOptionTypes'

// Describe the suite of tests for the CheckBoxOptionType component
describe('CheckBoxOptionType component', () => {
  let wrapper: any = null
  const vuetify = createVuetify()

  // Sample data for options
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

  // SETUP - run before each unit test
  beforeEach(() => {
    // Render the CheckBoxOptionTypeVue component with given props and plugins
    wrapper = mount(CheckBoxOptionTypeVue, {
      props: {
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

  // Test: Options checkbox should display correctly
  test('displays options in the checkbox correctly', async () => {
    // Assert the rendered text of the component contains the labels of options
    expect(wrapper.text()).toContain(options[0].label)
    expect(wrapper.text()).toContain(options[1].label)

    // Find input elements within the components and assert their presence
    const input1 = wrapper
      .findComponent({ ref: options[0].label })
      .find('input[type="checkbox"]')
    const input2 = wrapper
      .findComponent({ ref: options[1].label })
      .find('input[type="checkbox"]')
    expect(input1).toBeTruthy()
    expect(input2).toBeTruthy()
  })

  // Test: The component emits the correct values when options are selected
  test('emits correct values when options are selected', async () => {
    // Find input elements for options and set them as checked
    const input1 = wrapper
      .findComponent({ ref: options[0].label })
      .find('input[type="checkbox"]')
    const input2 = wrapper
      .findComponent({ ref: options[1].label })
      .find('input[type="checkbox"]')
    await input1.setChecked()
    await input2.setChecked()
    await wrapper.vm.$nextTick()

    // Assert that the emitted response matches the IDs of selected options
    expect(wrapper.emitted().response).toEqual([[[options[0].id]], [[options[0].id, options[1].id]]])
  })
})
