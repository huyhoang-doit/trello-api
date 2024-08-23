import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'


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

const getDetails = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {

    const board = await boardModel.getDetails(boardId)

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }

    // Deep Clone board ra một cái mới để xử lý, không ảnh hưởng đến data ban đầu
    // https://www.javascripttutorial.net/javascript-primitive-vs-reference-values/
    const resBoard = cloneDeep(board)

    // Đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
    })

    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }
}

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)

    return updatedBoard
  } catch (error) { throw error }
}
const moveCardToDifferentColumn = async (reqBody) => {
  try {

    // Khi di chuyển card sang column khác:
    // B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })
    // B2: Cập nhật mảng cardOrderIds của Column tiếp theo
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })
    // B3: Cập nhật lại columnId của Card đã kéo
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId

    })

    return {
      updateResult: 'successfully'
    }
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}