/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'


const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  // Enable req.body json data
  app.use(express.json())

  // Use APIs v1
  app.use('/v1', APIs_V1)

  //  Middleware error handler
  app.use(errorHandlingMiddleware)

  // Môi trường Production đang support cho Render.com
  if (env.BUILD_MODE === 'prod') {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Production: Hello ${env.AUTHOR}, I am running at ${process.env.PORT}`)
    })
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`Local dev: Hello ${env.AUTHOR}, I am running at ${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`)
    })
  }




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

