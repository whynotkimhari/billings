import { connectToDatabase } from "@utils/database"
import Billing from "@models/billing"
import User from "@models/user";
export const POST = async req => {
    const { userEmail, date, itemID, itemName, itemPrice, itemQuantity } = await req.json()

    // console.log(userID, date, itemID, itemName, itemPrice, itemQuantity)

    try {
        await connectToDatabase()
        const sessionUser = await User.findOne({ email: userEmail })

        const newBilling = new Billing({
            creator: sessionUser._id.toString(),
            date,
            itemID,
            itemName,
            itemPrice,
            itemQuantity,
        })

        await newBilling.save()

        return new Response(JSON.stringify(newBilling), { status: 201 })
        // return new Response(JSON.stringify({ userID, date, itemID, itemName, itemPrice, itemQuantity }), { status: 201 })
        
    } catch (error) {
        console.log(error)
        return new Response("Failed to create a new Billing", { status: 500 })
    }
}