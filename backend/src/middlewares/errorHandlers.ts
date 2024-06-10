import { z } from 'zod'
import { ErrorRequestHandler, Response } from 'express'

const handlerZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join('.'),
    message: err.message
  }))
  return res.status(400).json({ message: error.message, errors })
}

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error)

  if (error instanceof z.ZodError) {
    return handlerZodError(res, error)
  }

  return res.status(500).send('Internal Server Error')
}
