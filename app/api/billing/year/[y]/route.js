import { connectToDatabase } from "@utils/database"
import Billing from "@models/billing"

export const GET = async req => {
    try {
        
        if (req.method !== 'GET')
            return new Response({ message: "Not supported method!" }, { status: 405 })
    
        const year = Number(req.url.split('/').pop())
        
        await connectToDatabase()
        const items = await Billing.find({}).populate('creator')

        const qualifiedItems = items.filter(item => new Date(item.date).getFullYear() === year)

        return new Response(JSON.stringify(qualifiedItems), { status: 201 })

    } catch (error) {
        console.log(error)
        return new Response({ message: "Failed to get all items bill on day" }, { status: 500 })
    }
}