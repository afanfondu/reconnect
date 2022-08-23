import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log('Connected to MongoDB.')
  } catch (e: any) {
    console.log('Could not connect to MongoDB - ', e.message)
    process.exit(1)
  }
}

connectDB()
