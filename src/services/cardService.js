import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'


const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }

    const createdCard = await cardModel.createNew(newCard)

    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    if (getNewCard) {

      // Cập nhận lại mảng cardOrderIds trong collectin columns
      await columnModel.pushCardOrderIds(getNewCard)
    }

    return getNewCard
  } catch (error) { throw error }
}


export const cardService = {
  createNew
}