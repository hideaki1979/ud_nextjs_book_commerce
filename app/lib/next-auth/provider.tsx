"use client"

import { SessionProvider } from "next-auth/react"
import { FC, PropsWithChildren } from "react"

/**
 * NextAuthのSessionProviderをラップするコンポーネント。
 *
 * NextAuthのSessionProviderをappのルートに配置することで、サーバーサイドレンダリングやgetServerSidePropsでの認証情報を取得することができます。
 *
 * @see https://next-auth.js.org/configuration/providers#providing-sessions
 */
export const NextAuthProvider: FC<PropsWithChildren> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>
}