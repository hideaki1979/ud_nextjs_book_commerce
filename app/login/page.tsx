"use client"

import { getProviders, signIn } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../components/Loading";

/**
 * ログインコンポーネント。
 * 
 * このコンポーネントは、ユーザーが利用可能な認証プロバイダーの一覧を取得し、
 * 各プロバイダーにサインインするためのボタンを表示します。
 * 
 * プロバイダーがセットアップされると、利用可能なプロバイダーのボタンが表示され、
 * ボタンをクリックすることでサインインプロセスが開始されます。
 */

interface ProviderType {
    id: string;
    name: string;
    type: string;
}

function Login() {

    // React Queryを使用してプロバイダー情報を取得
    const { data: providers, isLoading, isError } = useQuery({
        queryKey: ['auth-providers'],
        queryFn: async () => {
            const providers = await getProviders()
            if (!providers) {
                throw new Error('プロバイダー情報の取得に失敗しました。')
            }
            return providers
        }
    })

    if (isLoading) return <LoadingSpinner />
    if (isError) return <div>エラーが発生しました。</div>

    return (
        <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
                        ログイン
                    </h2>
                </div>
                <div className="">
                    {providers &&
                        Object.values(providers as Record<string, ProviderType>).map((provider) => {
                            return (
                                <div key={provider.id} className="text-center">
                                    <button
                                        onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                                        className="bg-gray-200 text-black hover:bg-gray-600 hover:text-white py-2 px-4 rounded font-bold flex items-center justify-center w-full mb-2"
                                    >
                                        <svg
                                            role="img"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 mr-2"
                                            fill="currentColor"
                                        >
                                            <title>{provider.name} icon</title>
                                            {provider.id === 'github' && (
                                                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.723-4.042-1.608-4.042-1.608-.546-1.386-1.332-1.754-1.332-1.754-1.087-.743.083-.728.083-.728 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.956-.266 1.98-.398 3-.403 1.02.005 2.044.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.768.838 1.234 1.91 1.234 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.824 1.102.824 2.222 0 1.604-.015 2.897-.015 3.29 0 .322.216.697.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                                            )}
                                            {provider.id === 'google' && (
                                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                                            )}
                                            {provider.id === 'facebook' && (
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            )}
                                            {provider.id === 'twitter' && (
                                                <path d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148a13.98 13.98 0 0 0 10.15 5.144 4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z" />
                                            )}
                                        </svg>
                                        <span>{provider.name}でログイン</span>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Login