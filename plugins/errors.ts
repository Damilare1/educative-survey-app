import { ZodError } from 'zod'
export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      serverErrors: function (e: any) {
        const error = {
          statusCode: e.statusCode ?? 500,
          statusMessage: e.statusMessage ?? 'Internal server error',
          data: e.data ?? null
        }
        if (e instanceof ZodError) {
          error.statusCode = 403
          error.statusMessage = 'Validation error'
          error.data = e.issues
        }
        throw createError(error)
      }
    }
  }
})
