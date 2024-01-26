import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"

import connectDB from "@/app/lib/dbConnect"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        }),

    ],

    callbacks: {

        async signIn({ user }) {
            const { name, email, image } = user
            // console.log(url)
            try {
                await connectDB()

                const res = await axios.post("http://localhost:3000/api/player",

                    {
                        "name": name,
                        "email": email,
                        "url": image
                    },
                );


                return user


            } catch (error) {
                console.error("Error signing in:", res.status, res.statusText);
            }

        }
    }
})

export { handler as GET, handler as POST };