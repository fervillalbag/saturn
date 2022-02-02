/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mongoose, { ConnectOptions } from 'mongoose'

type ConnType = {
  isConnected: boolean | number
}

const mongoDBUri = process.env.MONGODB_URI

const conn: ConnType = {
  isConnected: false
}

const connectDB = async () => {
  if (conn.isConnected) return null

  const db = await mongoose.connect(mongoDBUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  } as ConnectOptions)
  conn.isConnected = db.connections[0].readyState
  console.log(db.connection.db.databaseName)
}

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected')
})

mongoose.connection.on('error', error => {
  console.log(error)
})

export default connectDB
