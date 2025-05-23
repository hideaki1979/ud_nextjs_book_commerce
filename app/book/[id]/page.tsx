import { getDetailBook } from '@/app/lib/microcms/client'
import Image from 'next/image'
import React from 'react'
import DOMPurify from 'isomorphic-dompurify'

/**
 * DetailBook
 *
 * @param {Object} props
 * @param {Promise<Object>} props.params - params.idをPromiseでラップ
 *
 * @returns {JSX.Element} DetailBook component
 *
 * @example
 * <Route path="/book/:id" element={<DetailBook />} />
 */
const DetailBook = async ({ params }: { params: Promise<{ id: string }> }) => {
    // console.log(params.id)
    const { id } = await params
    const book = await getDetailBook(id) // Fetchがデフォルトで呼ばれているのでSSRとなる。
    // console.log(book)

    return (
        <div className='container mx-auto p-4'>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden text-black'>
                <div className='flex justify-center'>
                    <Image
                        src={book.thumbnail.url}
                        alt={book.title}
                        className='h-80 object-cover'
                        width={700}
                        height={700}
                    />
                </div>
                <div className='p-4'>
                    <h2 className='text-2xl font-bold mb-4'>{book.title}</h2>
                    <div
                        className='text-gray-700'
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.content) }}
                    />
                    <div className='flex justify-between items-center mt-4'>
                        <span className='text-sm text-gray-500'>公開日：{new Date(book.publishedAt!).toLocaleString()}</span>
                        <span className='text-sm text-gray-500'>最終更新：{new Date(book.updatedAt!).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailBook