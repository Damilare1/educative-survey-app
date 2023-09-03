// Import necessary libraries and components
import { createVuetify } from 'vuetify'
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import DeleteConfirmationModalVue from '../DeleteConfirmationModal.vue'

// Import the modalComposable module and the IModalsDataStore interface
import * as modalComposable from '../../composables/useModals'
import type { IModalsDataStore } from '../../interfaces/IModalsDataStore'

// Define mock data for the modal control object
const modalCtrl: IModalsDataStore = {
  dialog: {
    show: true,
    name: 'delete'
  },
  data: {
    payload: {
      message: 'Are you sure?',
      action: vi.fn() // A mocked function for testing purposes
    }
  },
  toggleDialog: vi.fn(),
  setData: vi.fn(),
  reset: vi.fn()
}

// Mock the useModals function to return the modal control object
vi.spyOn(modalComposable, 'useModals').mockImplementation(() => modalCtrl)

// Describe the suite of tests for the DeleteConfirmationModal component
describe('Delete Confirmation Modal component', () => {
  let wrapper: VueWrapper
  const vuetify = createVuetify()

  beforeEach(() => {
    // Render the DeleteConfirmationModalVue component with given plugins
    wrapper = mount(DeleteConfirmationModalVue, {
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

  // Test: The correct message text should render
  test('renders correct message text', async () => {
    // Find the v-card-text component and assert its text matches the modalCtrl data
    const textComponent = wrapper.findComponent({ name: 'v-card-text' })
    expect(textComponent.text()).toStrictEqual(modalCtrl.data.payload.message)
  })

  // Test: The correct method should be called when button is clicked
  test('calls correct method when button is clicked', async () => {
    // Find the "Yes" button and trigger a click event
    const yesButton = wrapper.findAllComponents({ name: 'v-btn' }).at(0)
    expect(yesButton?.text()).toStrictEqual('Yes')
    await yesButton?.trigger('click')
    // Assert that the mocked action function in modalCtrl has been called
    expect(modalCtrl.data.payload.action).toBeCalled()
  })

  // Test: The component should emit the correct event when "Cancel" button is clicked
  test('emits correct event when "Cancel" button is clicked', async () => {
    // Find the "Cancel" button and trigger a click event
    const cancelButton = wrapper.findAllComponents({ name: 'v-btn' }).at(1)
    expect(cancelButton?.text()).toStrictEqual('Cancel')
    await cancelButton?.trigger('click')
    await wrapper.vm.$nextTick()
    // Assert that the 'closeDialog' event has been emitted
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
})
