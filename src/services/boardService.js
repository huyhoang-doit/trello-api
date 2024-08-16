import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'


const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng Model để xử lý tạo newBoard vào DB
    const createdBoard = await boardModel.createNew(newBoard)

    //Lấy bảng ghi vừa tạo
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)


    // Service phải có return, trả kết quả về cho Controller
    return getNewBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}