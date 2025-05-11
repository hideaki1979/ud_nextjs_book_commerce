import { NextResponse } from "next/server"
import { auth } from "./app/lib/auth/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isProfilePage = req.nextUrl.pathname.startsWith('/profile')

    if (isProfilePage && !isLoggedIn) {
        return NextResponse.redirect(new URL('/api/auth/signin', req.nextUrl.origin))
    }

    const response = NextResponse.next()

    // XSS対策（CSP）
    response.headers.set(
        'Content-Security-Policy',
        [
            // 基本的にはサイト自身のリソースのみ許可
            "default-src 'self'"
        ].join('; ')
    )

    // クリックジャッキング対策
    response.headers.set('X-Frame-Options', 'DENY')

    // MIMEタイプスニッフィング対策
    response.headers.set('X-Content-Type-Options', 'nosniff')

    // HTTPSの強制（本番環境）
    if (process.env.NODE_ENV === 'production') {
        response.headers.set(
            'Strict-Transport-Security',
            'max-age=31536000; includeSubDomains; preload'
        )
    }
    return response
})

// 対象となるパスを指定
export const config = {
    matcher: ['/profile/:path*']
}