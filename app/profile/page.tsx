import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'
import { nextAuthOptions } from '../lib/next-auth/options'
import { BookType, PurchaseType } from '../types/types'
import { getDetailBook } from '../lib/microcms/client'
import PurchasesDetailBook from '../components/PurchasesDetailBook'

/**
 * ユーザープロフィールページを表示する非同期関数
 *
 * @description
 *   現在のユーザーのセッション情報を取得し、ユーザーが購入した本の詳細情報を表示します。
 *   購入した本の詳細は、APIから取得された購入情報に基づいて取得されます。
 *   ユーザーのプロフィール画像と名前も表示されます。
 *
 * @returns {JSX.Element}
 *   ユーザープロフィールページコンポーネント
 */

export default async function UserProfilePage() {
    const session = await getServerSession(nextAuthOptions)
    const user = session?.user
    // console.log(session)
    let purchasesDetailBooks: BookType[] = []

    if (user) {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/purchase/${user?.id}`,
            { cache: "no-store" } // SSR
        )
        const purchasesData: PurchaseType[] = await response.json()

        purchasesDetailBooks = await Promise.all(
            purchasesData.map(async (purchase: PurchaseType) => {
                return await getDetailBook(purchase.bookId)
            })
        )

    }

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-xl font-bold mb-4'>プロフィール</h1>
            <div className='text-black bg-white shadow-white shadow-md rounded p-4'>
                <div className='flex items-center'>
                    <Image
                        priority
                        width={60}
                        height={60}
                        src={user?.image || '/default_icon.png'}
                        alt='user profile icon'
                        className='rounded-t-md'
                    />
                    <h2 className='text-lg font-semibold ml-4'>お名前：{user?.name}</h2>
                </div>
            </div>
            <span className='font-medium text-lg block my-4'>購入した記事</span>
            <div className='flex flex-wrap items-start gap-6 justify-center'>
                {purchasesDetailBooks.map((purchasesDetailBook) => (
                    <PurchasesDetailBook
                        key={purchasesDetailBook.id}
                        purchasesDetailBook={purchasesDetailBook}
                    />
                ))}
            </div>
        </div>
    )
}