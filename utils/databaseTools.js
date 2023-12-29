import mongoose from "mongoose";

let isConnected = false; // track connection status

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('Already connected to mongoDB')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "billings",
        })

        isConnected = true
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log(error)
    }
}