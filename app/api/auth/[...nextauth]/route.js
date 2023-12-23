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
            const key = { email: session.user.email }
            const sessionUser = await User.findOne(key)
            
            session.user.id = sessionUser._id.toString()

            return session
        },
        async signIn({ profile }) {
            try {
                await connectToDatabase()

                // check if existed user
                const key = { email: profile.email }
                const userExist = await User.findOne(key)

                // else, create new user
                if (!userExist) {
                    const name = `${profile.given_name} ${profile.family_name}`
                    const user = {
                        email: profile.email,
                        username: name,
                        image: profile.picture
                    }

                    User.create(user)
                }

            } catch (error) {
                console.log(error)
            }
        }
    }
})

export { handler as GET, handler as POST }