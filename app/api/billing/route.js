import { connectToDatabase } from "@utils/database"
import Billing from "@models/billing"

// This API for getting all items

export const GET = async req => {
    try {
        if (req.method !== 'GET')
            return new Response({ message: "Not supported method!" }, { status: 405 })

        await connectToDatabase()
        const items = await Billing.find({}).populate('creator')

        return new Response(JSON.stringify(items), { status: 201 })
        
    } catch (error) {
        console.log(error)
        return new Response({ message: "Failed to get all items bill"}, { status: 500 })
    }
}