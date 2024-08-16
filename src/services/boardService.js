import { slugify } from '~/utils/formatters'


const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Service phải có return, trả kết quả về cho Controller
    return newBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}