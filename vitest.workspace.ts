import { defineWorkspace } from 'vitest/config'

// Define the Vitest workspace configuration
export default defineWorkspace([
  {
    // Merge this configuration with an external config file
    extends: './vitest.config.ts',
    test: {
      // Include component tests
      include: ['components/__tests__/*.spec.ts'],

      // Define a name for this test suite (recommended for clarity)
      name: 'component-tests'
    }
  },

  {
    // Merge this configuration with another external config file
    extends: './nuxtvitest.config.ts',
    test: {
      // Include page tests
      include: ['pages/__tests__/*.spec.ts'],

      // Define a name for this test suite (recommended for clarity)
      name: 'page-tests'
    }
  }
])
