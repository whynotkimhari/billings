import { connectToDatabase } from "@utils/database"
import Billing from "@models/billing"

// This API for getting items in the YEAR by user

export const GET = async (req, { params }) => {
    try {

        if (req.method !== 'GET')
            return new Response({ message: "Not supported method!" }, { status: 405 })

        if (params.userID == undefined)
            return new Response({ message: 'Undefined user' }, { status: 404 })

        await connectToDatabase()
        const items = await Billing.find({ creator: params.userID, year: Number(params.y) }).populate('creator')

        return new Response(JSON.stringify(items), { status: 201 })

    } catch (error) {
        console.log(error)
        return new Response({ message: "Failed to get all items bill in year" }, { status: 500 })
    }
}