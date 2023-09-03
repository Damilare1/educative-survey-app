import { z, ZodError } from 'zod'
export default defineEventHandler(async (event) => {
  const loginParameters = z
    .object({
      email: z.string().email(),
      password: z
        .string()
        .min(8, { message: 'Password must contain at least 8 characters' }),
      username: z.string()
    })
    .strict()
  try {
    const body = loginParameters.parse(await readBody(event))
    const config = useRuntimeConfig()
    const user = await $fetch('/admin/signup', {
      baseURL: config.surveyApiUrl,
      method: 'POST',
      body
    })
    return user
  } catch (e) {
    const error = {
      statusCode: e?.statusCode ?? 500,
      statusMessage: e?.statusMessage ?? 'Internal server error',
      data: e.data?.message ?? null
    }
    if (e instanceof ZodError) {
      error.statusCode = 403
      error.statusMessage = 'Validation error'
      error.data = e.issues
    }
    throw createError(error)
  }
})
