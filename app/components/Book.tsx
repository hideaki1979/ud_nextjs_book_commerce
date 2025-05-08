"use client"

import Image from "next/image"
import { BookType } from "../types/types"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type BookProps = {
    book: BookType;
    isPurchase: boolean;
}

const Book = ({ book, isPurchase }: BookProps) => {

    const [isShowModal, setIsShowModal] = useState(false)
    const { data: session } = useSession()
    const user = session?.user
    const router = useRouter()
    // console.log(user?.id)

    const handleShowModal = () => {
        if (isPurchase) {
            alert("その書籍は既に購入済です")
        } else {
            setIsShowModal(true)
        }
    }

    const handleCloseModal = () => {
        setIsShowModal(false)
    }

    const startCheckout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: book.title,
                    price: book.price,
                    bookId: book.id,
                    userId: user?.id
                })
            })
            console.log("レスポンスURL：", response)
            const resData = await response.json()

            if (resData) {
                router.push(resData.url)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const hadlePurchaseConfirm = () => {
        if (!user) {
            setIsShowModal(false)
            // ログインページへリダイレクト
            router.push('/api/auth/signin')
        } else {
            // Stripe決済を行う
            startCheckout()
        }
    }

    return (
        <>
            {/* アニメーションスタイル */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .modal {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>

            <div className="flex flex-col items-center m-4">
                <a
                    onClick={handleShowModal}
                    className="cursor-pointer shadow-2xl duration-300 hover:translate-y-2 hover:shadow-none"
                >
                    <Image
                        priority
                        src={book.thumbnail.url}
                        alt={book.title}
                        width={450}
                        height={350}
                        className="rounded-t-md"
                    />
                    <div className="p-4 bg-slate-100 rounded-b-md text-black">
                        <h2 className="text-lg font-semibold">{book.title}</h2>
                        <p className="mt-2 text-lg text-slate-600">{book.content}</p>
                        <p className="mt-2 text-md text-slate-700">値段：{book.price}円</p>
                    </div>
                </a>

                {isShowModal && (
                    <div
                        onClick={handleCloseModal}  // 背景クリック時にモーダルを閉じる
                        className="fixed inset-0 bg-slate-700 opacity-90  flex items-center justify-center z-50"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}    // モーダル内部のクリックは伝播させない 
                            className="bg-black p-8 rounded-lg"
                        >
                            <h3 className="text-xl font-semibold mb-4">
                                本を購入しますか？
                            </h3>
                            <button
                                onClick={hadlePurchaseConfirm}
                                className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-2xl mr-6"
                            >
                                購入する
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-500 hover:bg-gray-700 font-bold py-2 px-4 rounded-2xl"
                            >
                                キャンセル
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Book