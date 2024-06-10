import mongoose from 'mongoose'
import { oneWeekFromNow } from '../utils/date'

export interface SessionDocument extends mongoose.Document {
  userID: mongoose.Types.ObjectId
  userAgent?: string
  createdAt: Date
  expiresAt: Date
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
  userID: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  userAgent: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, default: oneWeekFromNow }
})

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema)
export default SessionModel
