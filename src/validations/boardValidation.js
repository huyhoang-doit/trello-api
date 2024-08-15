import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  /**
   * Note: Mặc định chúng ta không cần phải custom message ở phía BE, vì để cho FE tự validate và custom phía FE cho đẹp
   * BE chỉ cần validate đảm bảo dữ liệu chuẩn xác, và trả về message mặc định từ thư viện là được.
   * Quan trọng: Việc validate dữ liệu bắt buộc phải có ở phía BE vì đây là điểm cuối lưu trữ dữ liệu vào DB
   * và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu ở cả FE và BE
   */
  const correctValidation = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is a required field',
      'string.trim': 'Title must not have leading or trailing spaces',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title should have a minimum length of 3',
      'string.max': 'Title should have a maximum length of 50'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    console.log('req.body:', req.body)

    await correctValidation.validateAsync(req.body, { abortEarly: false })

    // next()

    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: API create list boards', code: StatusCodes.CREATED })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }


}
export const boardValidation = {
  createNew
}