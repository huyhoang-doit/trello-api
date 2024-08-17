import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {

    // Điều hướng dữ liệu sang tầng Service
    // console.log(req.body)
    const createBoard = await boardService.createNew(req.body)

    // Kết quả trả về phía Client
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) { next(error) }
}


export const boardController = {
  createNew
}