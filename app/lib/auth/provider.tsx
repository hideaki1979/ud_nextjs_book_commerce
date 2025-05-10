"use client"

import { SessionProvider } from "next-auth/react"
import { FC, PropsWithChildren } from "react"

/**
 * Auth.jsのSessionProviderをラップするコンポーネント。
 *
 * SessionProviderをappのルートに配置することで、
 * 認証情報をアプリ全体で利用できるようにします
 */
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>
}