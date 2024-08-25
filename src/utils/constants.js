// Những domain được phép truy cập đến tài nguyên của server
export const WHITELIST_DOMAINS = [
  // Không cần localhost FE nữa vì môi trường dev luôn được truy cập
  // domain deploy Vercel
  'https://trello-web-one-eta.vercel.app'
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}
