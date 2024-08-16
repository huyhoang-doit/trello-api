import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Huy Hoàng test error')
    // res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create list boards', code: StatusCodes.CREATED })
  } catch (error) { next(error) }
}


export const boardController = {
  createNew
}