import mongoose from "mongoose";

let isConnected = false; // track connection status
let cnt = 0

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('Already connected to mongoDB', cnt++)
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "billings",
        })

        isConnected = true
        console.log('Connected to mongoDB', cnt++)
    } catch (error) {
        console.log(error)
    }
}