import Image from "next/image"
import Link from "next/link"
import { auth } from "../lib/auth/auth"
/**
 * ヘッダーコンポーネント
 * 
 * @description
 *   Next-Authの認証状態に応じて、ログイン/ログアウトボタンを表示します。
 *   また、ユーザーのプロフィール画像を表示します。
 * 
 * @return {JSX.Element}
 *   ヘッダー要素
 */
const Header = async () => {

    const session = await auth()
    const user = session?.user
    // console.log(user)

    return (
        <header className="bg-slate-700 text-gray-100 shadow-lg">
            <nav className="flex items-center justify-between p-4">
                <Link href={"/"} className="text-xl font-bold">
                    Book Commerce
                </Link>
                <div className="flex items-center gap-2">
                    <Link
                        href={"/"}
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        ホーム
                    </Link>
                    {user ? (
                        // <LogoutButton />
                        <Link
                            href={"/api/auth/signout"}  // Next-Authが用意したログアウトの標準API
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            ログアウト
                        </Link>
                    ) : (
                        <Link
                            // href={"/login"}
                            href={"/api/auth/signin"}   // Next-Authが用意したログインの標準API
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            ログイン
                        </Link>
                    )}

                    <Link href={"/profile"}>
                        <Image
                            width={50}
                            height={50}
                            alt="profile_icon"
                            src={user?.image || "/default_icon.png"}
                            className="rounded-full"
                        />
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header