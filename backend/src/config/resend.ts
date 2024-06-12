import { Resend } from 'resend'
import { RESEND_API } from '../constants/env'

const resend = new Resend(RESEND_API)

export default resend
