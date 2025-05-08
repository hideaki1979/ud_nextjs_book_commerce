import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BookType } from '../types/types'

type PurchasesDetailBookProps = {
    purchasesDetailBook: BookType;
}

const PurchasesDetailBook = ({ purchasesDetailBook }: PurchasesDetailBookProps) => {
    return (
        <Link
            href={`/book/${purchasesDetailBook.id}`}
            className='cursor-pointer shadow-white shadow-xl duration-300 hover:translate-y-1 hover:shadow-none'
        >
            <Image
                priority
                src={purchasesDetailBook.thumbnail.url}
                alt={purchasesDetailBook.title}
                width={450}
                height={350}
                className='rounded-t-md'
            />
            <div className='p-4 bg-slate-100 text-black rounded-b-md'>
                <h2 className='text-lg font-semibold'>{purchasesDetailBook.title}</h2>
                <p className='mt-2 text-slate-700'>値段：{purchasesDetailBook.price}円</p>
            </div>
        </Link>
    )
}

export default PurchasesDetailBook