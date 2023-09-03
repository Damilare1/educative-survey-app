// Import necessary libraries and components
import { createVuetify } from 'vuetify'
import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'

// Import ResizeObserver polyfill for testing environment
import ResizeObserver from 'resize-observer-polyfill'

import MenuWithIcons from '../MenuWithIcons.vue'

// Sample data for menu items
const items = [
  {
    id: '1',
    label: 'Item 1',
    icon: 'mdi-radiobox-marked'
  },
  {
    id: '2',
    label: 'Item 2',
    icon: 'mdi-checkbox-outline'
  }
]

// Describe the suite of tests for the MenuWithIcons component
describe('Menu with icons component', () => {
  let wrapper: VueWrapper
  const vuetify = createVuetify()

  beforeEach(() => {
    // Set ResizeObserver globally in the testing environment
    global.ResizeObserver = ResizeObserver

    // Render the MenuWithIcons component with given props and plugins
    wrapper = mount(MenuWithIcons, {
      props: {
        items,
        selected: 'Item 1'
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

  // Test: The correct text should render
  test('renders correct text', async () => {
    // Assert that the rendered text of the component matches the label of the first item
    expect(wrapper.text()).toEqual(items[0].label)
  })

  // Test: The menu should render when button is clicked
  test('renders menu when button is clicked', async () => {
    // Assert that initially no v-list-item components are rendered
    expect(wrapper.findAllComponents({ name: 'v-list-item' })).toStrictEqual([])

    // Trigger click on the menu button
    const menuButton = wrapper.findAllComponents({ name: 'v-btn' }).at(0)
    await menuButton?.trigger('click')

    // Assert that v-list-item components are rendered and contain the correct labels
    const listComponents = wrapper.findAllComponents({ name: 'v-list-item' })
    expect(listComponents.length).toBeGreaterThan(0)
    expect(listComponents.at(0)?.findComponent({ name: 'v-btn' }).text()).toEqual(items[0].label)
    expect(listComponents.at(1)?.findComponent({ name: 'v-btn' }).text()).toEqual(items[1].label)
  })

  // Test: The component emits the correct event when each button is clicked
  test('emits correct event when each button is clicked', async () => {
    // Trigger click on the menu button
    const menuButton = wrapper.findAllComponents({ name: 'v-btn' }).at(0)
    await menuButton?.trigger('click')

    // Trigger click on the first and second menu items
    const listComponents = wrapper.findAllComponents({ name: 'v-list-item' })
    const firstMenuItem = listComponents.at(0)?.findComponent({ name: 'v-btn' })
    await firstMenuItem?.trigger('click')
    const secondMenuItem = listComponents.at(1)?.findComponent({ name: 'v-btn' })
    await secondMenuItem?.trigger('click')
    await wrapper.vm.$nextTick()

    // Assert that the emitted event 'itemSelected' contains the expected IDs
    expect(wrapper.emitted().itemSelected).toEqual([[items[0].id], [items[1].id]])
  })
})
