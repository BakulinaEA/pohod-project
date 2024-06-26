import { z } from 'zod'

export const userName = z.string().min(1, {
  message: 'Введите имя пользователя'
})
export const emailSchema = z.string().email().min(1).max(255)
export const passwordSchema = z.string().min(6).max(255)

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional()
})

export const registerSchema = loginSchema
  .extend({
    username: userName,
    confirmPassword: passwordSchema
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
  })

export const verificationCodeSchema = z.string().min(1).max(24)

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema
})
