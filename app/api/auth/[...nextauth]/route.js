import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

import { connectToDatabase } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callback: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })
            session.user.id = sessionUser._id.toString()

            return session
        },
        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDatabase()

                // check if existed user
                const userExist = await User.findOne({ email: profile.email })

                // else, create new user
                if (!userExist) {
                    const name = `${profile.given_name} ${profile.family_name}`
                    const user = {
                        email: profile.email,
                        username: name,
                        image: profile.picture
                    }

                    await User.create(user)
                }

            } catch (error) {
                console.log(error)
            }
        }
    }
})

export { handler as GET, handler as POST }