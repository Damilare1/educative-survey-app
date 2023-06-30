import { z, ZodError } from 'zod'
export default defineEventHandler(async (event) => {
  const loginParameters = z
    .object({
      email: z.string().email(),
      password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
      username: z.string()
    })
    .strict()
  try {
    const body = loginParameters.parse(await readBody(event))
    const user = await $fetch('http://localhost:8004/api/admin/signup', { method: 'POST', body })
    return user
  } catch (e) {
    const error = {
      statusCode: 500,
      statusMessage: 'Internal server error',
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
