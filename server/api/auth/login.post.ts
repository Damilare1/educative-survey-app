import { z, ZodError } from 'zod'
export default defineEventHandler(async (event) => {
  const loginParameters = z
    .object({
      email: z.string().email(),
      password: z.string().min(8, { message: 'Password must contain at least 8 characters' })
    })
    .strict()
  try {
    const body = loginParameters.parse(await readBody(event))
    const user = await $fetch('http://localhost:8004/api/admin/login', { method: 'POST', body })
    return user
  } catch (e: any) {
    const error = {
      statusCode: e.statusCode ?? 500,
      statusMessage: e.statusMessage ?? 'Internal server error',
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
