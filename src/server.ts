import mongoose from 'mongoose'
import config from './config'
import app from './app'

async function server() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(` Nodejs Server starter project is running on port ${config.port} - Alhamdulillah`)
    })
  } catch (error) {
    console.error(error)
  }
}

server()
