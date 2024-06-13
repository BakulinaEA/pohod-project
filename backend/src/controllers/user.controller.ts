import { NOT_FOUND, OK } from '../constants/http'
import UserModel from '../models/user.model'
import appAssert from '../utils/appAssert'
import catchErrors from '../utils/catchErrors'

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userID)
  appAssert(user, NOT_FOUND, 'Пользователь не найден')
  return res.status(OK).json(user.omitPassword())
})
