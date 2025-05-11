import { NextResponse } from "next/server"
import { auth } from "./app/lib/auth/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isProfilePage = req.nextUrl.pathname.startsWith('/profile')

    if (isProfilePage && !isLoggedIn) {
        return NextResponse.redirect(new URL('/api/auth/signin', req.nextUrl.origin))
    }

    return NextResponse.next()
})

// 対象となるパスを指定
export const config = {
    matcher: ['/profile/:path*']
}