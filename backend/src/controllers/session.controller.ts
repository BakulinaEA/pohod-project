import { z } from 'zod'
import { NOT_FOUND, OK } from '../constants/http'
import SessionModel from '../models/session.model'
import catchErrors from '../utils/catchErrors'
import appAssert from '../utils/appAssert'

export const getSessionsHandler = catchErrors(async (req, res) => {
  const sessions = await SessionModel.find(
    {
      userID: req.userID,
      expiresAt: { $gt: Date.now() }
    },
    {
      _id: 1,
      userAgent: 1,
      createdAt: 1
    },
    {
      sort: { createdAt: -1 }
    }
  )

  return res.status(OK).json(
    // mark the current session
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === req.sessionID && {
        isCurrent: true
      })
    }))
  )
})

export const deleteSessionHandler = catchErrors(async (req, res) => {
  const sessionId = z.string().parse(req.params.id)
  const deleted = await SessionModel.findOneAndDelete({
    _id: sessionId,
    userID: req.userID
  })
  appAssert(deleted, NOT_FOUND, 'Сессия не найдена')
  return res.status(OK).json({ message: 'Сессия удалена' })
})
