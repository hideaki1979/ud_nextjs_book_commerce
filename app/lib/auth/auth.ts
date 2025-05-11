import prisma from "../prisma"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import Twitter from "next-auth/providers/twitter"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"


export const { auth, handlers, signIn, signOut } = NextAuth({
    debug: process.env.NODE_ENV === 'development',
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
        }),
        Twitter({
            clientId: process.env.TWITTER_ID!,
            clientSecret: process.env.TWITTER_SECRET!
        })

    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            // プロフィールページは認証済みユーザーのみアクセス可
            const isLogIn = !!auth?.user
            const isProfilePage = nextUrl.pathname.startsWith('/profile')
            if (isProfilePage) {
                return isLogIn
            }
            // 他のページは誰でもアクセス可
            return true
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session: ({ session, token }) => {
            if (session.user && token.id) {
                session.user.id = token.id as string
            }
            return session
        },
        redirect({ baseUrl }) {
            return baseUrl
        }
    },
    pages: {
        error: '/auth/error'
    },
    session: {
        strategy: 'jwt'
    }
})