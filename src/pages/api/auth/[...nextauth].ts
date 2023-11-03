import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { NextApiRequest, NextApiResponse } from 'next'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ]
}) as (req: NextApiRequest, res: NextApiResponse) => Promise<void>
