import { HttpStatusCode } from '../constants/http'
import AppErrorCode from '../constants/AppErrorCode'

export class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCode
  ) {
    super(message)
  }
}

export default AppError
