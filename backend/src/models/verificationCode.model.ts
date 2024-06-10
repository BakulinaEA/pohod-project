import mongoose from 'mongoose'
import VerificationCodeType from '../constants/verificationCodeTypes'

export interface VerificationCodeDocument extends mongoose.Document {
  userID: mongoose.Types.ObjectId
  type: VerificationCodeType
  createdAt: Date
  expiresAt: Date
}

const VerificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
  userID: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true }
})

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
  'VerificationCode',
  VerificationCodeSchema,
  'verification_codes'
)

export default VerificationCodeModel
