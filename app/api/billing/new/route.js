import { connectToDatabase } from "@utils/database"
import Billing from "@models/billing"

// This API for creating new item

export const POST = async req => {
    if (req.method !== "POST")
        return new Response({ message: "Not supported method!" }, { status: 405 })

    const { userID, day, month, year, itemID, itemName, itemPrice, itemQuantity } = await req.json()

    try {
        await connectToDatabase()

        const newBilling = new Billing({
            creator: userID,
            day,
            month,
            year,
            itemID,
            itemName,
            itemPrice,
            itemQuantity,
        })

        await newBilling.save()

        return new Response(JSON.stringify(newBilling), { status: 201 })

    } catch (error) {
        console.log(error)
        return new Response({ message: "Failed to create a new Billing" }, { status: 500 })
    }
}