import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'


const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    const createdColumn = await columnModel.createNew(newColumn)

    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      // Xử lý data trước khi trả về chuẩn data bên FE
      getNewColumn.cards = []

      // Cập nhận lại mảng columnOrderIds trong collectin boards
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) { throw error }
}


export const columnService = {
  createNew
}