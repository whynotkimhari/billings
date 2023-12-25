import { connectToDatabase } from "@utils/database"
import Billing from "@models/billing"

// This API for getting items in the MONTH

export const GET = async req => {
    try {
        
        if (req.method !== 'GET')
            return new Response({ message: "Not supported method!" }, { status: 405 })
    
        const month = Number(req.url.split('/').pop())
        
        await connectToDatabase()
        const items = await Billing.find({}).populate('creator')

        const qualifiedItems = items.filter(item => new Date(item.date).getMonth() === month - 1)

        return new Response(JSON.stringify(qualifiedItems), { status: 201 })

    } catch (error) {
        console.log(error)
        return new Response({ message: "Failed to get all items bill on day" }, { status: 500 })
    }
}