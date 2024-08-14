/* eslint-disable no-console */
import express from 'express'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'


const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    console.log(process.env)
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })


  // Thực hiện các tác vụ cleanup trước khi dừng server
  // Đọc thêm ở đây: https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
  exitHook(() => {
    CLOSE_DB()
  })
}

// Chỉ khi kết nối Database thành công thì mới start server backend lên
// Immediately-invoked/ Anonymous Async Functions (IIFE)
(async () => {
  try {
    console.log('Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('Connected to MongoDB Cloud Atlas')

    START_SERVER()
  } catch (error) {
    console.err(error)
    process.exit(0)
  }
})()

// Chỉ khi kết nối Database thành công thì mới start server backend lên
// CONNECT_DB()
//   .then(() => { console.log('Connected to MongoDB Cloud Atlas') })
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.err(error)
//     process.exit(0)
//   })

