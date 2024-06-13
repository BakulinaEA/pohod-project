import mongoose from 'mongoose'

declare global {
  namespace Express {
    interface Request {
      userID: mongoose.Types.ObjectId | any
      sessionID: mongoose.Types.ObjectId | any
    }
  }
}

export {}
