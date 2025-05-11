"use client"

import LoadingSpinner from "@/app/components/Loading"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

/**
 * 購入完了画面
 *
 * Stripe Checkout からredirectされてきた後の画面。
 * 購入した商品の詳細をメールで送信する。
 * 画面には、購入した商品の詳細ページのリンクを表示する。
 */
const PurchaseSuccess = () => {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')

    const { data, isLoading, isError } = useQuery({
        queryKey: ['checkoutSuccess', sessionId],
        queryFn: async () => {
            if (!sessionId) return null
            const result = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/checkout/success`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sessionId })
                }
            )
            return await result.json()
        },
        enabled: !!sessionId    // sessionIdが存在する場合のみクエリを実行
    })

    if (isLoading) return <LoadingSpinner />
    if (isError) return <div>エラーが発生しました。</div>
    if (!data) return null

    return (
        <div className="flex items-center justify-center mt-20">
            <div className="bg-black p-6 rounded-lg shadow-white shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-200 mb-4">
                    購入ありがとうございます。
                </h1>
                <p className="text-center text-gray-200">
                    ご購入頂いた内容の詳細は、登録されたメールアドレスに送信されます。
                </p>
                <div className="mt-8 text-center underline">
                    <Link
                        href={`/book/${data.bookId}`}
                        className="text-indigo-400 hover:text-indigo-200 transition duration-500"
                    >
                        購入した記事を読む
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PurchaseSuccess