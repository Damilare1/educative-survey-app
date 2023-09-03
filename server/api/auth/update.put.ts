import { z, ZodError } from 'zod'
export default defineEventHandler(async (event) => {
  const authorization = getHeader(event, 'authorization') ?? ''
  if (!authorization) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Validation error',
      data: {
        message: 'Missing authorization header'
      }
    })
  }
  const updateParameters = z
    .object({
      email: z.string().email(),
      oldpassword: z
        .string()
        .min(8, { message: 'Password must contain at least 8 characters' }),
      newpassword: z
        .string()
        .min(8, { message: 'Password must contain at least 8 characters' }),
      username: z.string()
    })
    .strict()
  try {
    const body = updateParameters.parse(await readBody(event))
    const config = useRuntimeConfig()
    const user = await $fetch('/admin/update', {
      baseURL: config.surveyApiUrl,
      method: 'POST',
      headers: {
        authorization
      },
      body
    })
    return user
  } catch (e) {
    const error = {
      statusCode: e.statusCode ?? 500,
      statusMessage: 'Internal server error',
      data: { message: e.data?.message ?? null, fields: e.data?.fields }
    }
    if (e instanceof ZodError) {
      error.statusCode = 403
      error.statusMessage = 'Validation error'
      error.data = e.issues
    }
    throw createError(error)
  }
})
