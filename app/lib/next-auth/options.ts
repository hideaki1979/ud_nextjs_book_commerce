import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import prisma from "../prisma"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import TwitterProvider from "next-auth/providers/twitter"

export const nextAuthOptions: NextAuthOptions = {
    debug: false,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID!,
            clientSecret: process.env.TWITTER_SECRET!,
            version: "2.0" // opt-in to Twitter OAuth 2.0
        })

    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: ({ session, token, user }) => {
            return {
                ...session,
                ...token,
                user: {
                    ...session.user,
                    ...token,
                    id: user.id
                }
            }
        },
        signIn: async ({ user, account }) => {
            // アカウントが存在し、メールが検証済みであれば許可
            if (account && account.provider === 'facebook' && user.email) {
                return true
            }
            return true // 他の場合も許可
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}