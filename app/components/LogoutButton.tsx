"use client"

import { signOut } from "../lib/auth/auth"

/**
 * A button component that signs out the user using Next-Auth's {@link signOut} function.
 * When clicked, the user will be redirected to the login page.
 */
const LogoutButton = () => {
    return (
        <button
            onClick={() => signOut({ redirect: true })}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
            ログアウト
        </button>
    )
}

export default LogoutButton