import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDatabase } from '@utils/database';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {

            const sessionUser = session && session?.user && await User.findOne({ email: session.user.email }).maxTimeMS(20000);
            session.user.id = sessionUser._id.toString();

            return session
        },
        async signIn({ user, account, profile, email, credentials }) {
            try {
                await connectToDatabase();
                const userExists = await User.findOne({ email: profile?.email });
                // if not, create a new document and save user in MongoDB
                if (userExists === null) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name.replace(/\s+/g, '').toLowerCase(),
                        image: user.image
                    })
                }

                return true
            } catch (error) {
                console.log(error);
                return false
            }

        }
    }
})

export { handler as GET, handler as POST }