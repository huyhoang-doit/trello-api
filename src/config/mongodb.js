import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'


// Khởi tạo đối tượng bao đầu là null (khi chưa connect database)
let trelloDatabaseInstance = null


// Khởi tạo một đối tượng client để connect với mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})


// Kết nối tới Database
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()

  // Lấy database theo thên DATABASE NAME gán cho biến trelloDatabaseInstance ban đầu
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Đóng kết nối với Database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

// Function GET_DB (không async) này có nhiệm vụ export ra cái Trello DB Instance sau khi connect thành công mongodb
// Đảm bảo luôn gọi hàm GET_DB sau khi đã kết nối thành công tới MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to database first !!!')
  return trelloDatabaseInstance
}
