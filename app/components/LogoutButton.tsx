"use client"

import { signOut } from "next-auth/react"

const LogoutButton = () => {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/api/auth/signin', redirect: true })}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
            ログアウト
        </button>
    )
}

export default LogoutButton