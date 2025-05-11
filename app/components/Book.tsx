"use client"

import Image from "next/image"
import { BookType } from "../types/types"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import DOMPurify from "isomorphic-dompurify";

type BookProps = {
    book: BookType;
    isPurchase: boolean;
    user: User | undefined;
}

/**
 * Bookコンポーネントは、書籍の情報を表示し、購入を行うためのUIを提供します。
 * 
 * @param {BookProps} props - コンポーネントのプロパティ
 * @param {Object} props.book - 書籍の詳細情報を含むオブジェクト
 * @param {boolean} props.isPurchase - 書籍が購入済みかどうかを示すフラグ
 * @param {User | undefined} props.user - 現在のユーザー情報
 * 
 * @returns 書籍のサムネイル、タイトル、コンテンツ、価格を表示し、購入ボタンを提供するUIを返します。
 * 購入ボタンをクリックすると、購入確認のモーダルが表示され、購入を進めることができます。
 * 
 * モーダルでは、「購入する」ボタンをクリックすることで、ログインしている場合はStripeでの決済が開始されます。
 * ログインしていない場合は、ログインページにリダイレクトされます。
 */

const Book = ({ book, isPurchase, user }: BookProps) => {

    const [isShowModal, setIsShowModal] = useState(false)
    const router = useRouter()

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

            <div className="flex justify-center p-4 w-full md:w-1/2 lg:w-1/3">
                <a
                    onClick={handleShowModal}
                    className="cursor-pointer shadow-gray-300 shadow-lg duration-300 hover:translate-y-2 hover:shadow-none w-full max-w-sm"
                >
                    <div className="flex justify-center">
                        <Image
                            priority
                            src={book.thumbnail.url}
                            alt={book.title}
                            width={450}
                            height={350}
                            className="rounded-t-md h-52 object-cover"
                        />
                    </div>
                    <div className="p-4 bg-slate-100 rounded-b-md text-black">
                        <h2 className="text-lg font-semibold truncate">{book.title}</h2>
                        <div
                            className="mt-2 text-lg text-slate-600 line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.content) }}
                        >
                        </div>
                        <p className="mt-2 text-md text-slate-700">値段：{book.price}円</p>
                    </div>
                </a>

                {isShowModal && (
                    <div
                        onClick={handleCloseModal}  // 背景クリック時にモーダルを閉じる
                        className="fixed inset-0 bg-slate-700 opacity-90 flex items-center justify-center z-50"
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