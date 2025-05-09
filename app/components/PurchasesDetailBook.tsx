import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BookType } from '../types/types'

type PurchasesDetailBookProps = {
    purchasesDetailBook: BookType;
}

/**
 * PurchasesDetailBook
 *
 * @param {Object} props
 * @param {BookType} props.purchasesDetailBook - 1つのBookType
 *
 * @returns {JSX.Element} 1つのBookTypeを表示するComponent
 *
 * @example
 * <PurchasesDetailBook purchasesDetailBook={{ id: "hoge", title: "hoge", price: 100, thumbnail: { url: "https://example.com/image.jpg" } }} />
 */
const PurchasesDetailBook = ({ purchasesDetailBook }: PurchasesDetailBookProps) => {
    return (
        <div className='w-full md:w-1/2 lg:1/3 max-w-sm'>
            <Link
                href={`/book/${purchasesDetailBook.id}`}
                className='cursor-pointer shadow-white shadow-xl duration-300 hover:translate-y-1 hover:shadow-none rounded-md'
            >
                <Image
                    priority
                    src={purchasesDetailBook.thumbnail.url}
                    alt={purchasesDetailBook.title}
                    width={450}
                    height={350}
                    className='rounded-t-md h-52 object-cover w-full'
                />
                <div className='p-4 bg-slate-100 text-black rounded-b-md'>
                    <h2 className='text-lg font-semibold truncate'>{purchasesDetailBook.title}</h2>
                    <p className='mt-2 text-slate-700'>値段：{purchasesDetailBook.price}円</p>
                </div>
            </Link>
        </div>
    )
}

export default PurchasesDetailBook