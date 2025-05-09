import { BookType } from '@/app/types/types';
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
    serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN!,
    apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY!
});

/**
 * 全ての本の情報を取得
 *
 * @returns {Promise<BookType[]>} 本の情報の配列
 */
export const getAllBooks = async () => {
    const allBooks = await client.getList<BookType>({
        endpoint: "bookcommerce",
        customRequestInit: {
            cache: "no-store"
        }
    })

    return allBooks
}

/**
 * 指定されたIDの本の情報を取得
 *
 * @param {string} contentId - 取得したい本のID
 * @returns {Promise<BookType>} 本の情報
 */
export const getDetailBook = async (contentId: string) => {
    const detailBook = await client.getListDetail<BookType>({
        endpoint: "bookcommerce",
        contentId,
        customRequestInit: {
            // cache: "no-store"   // SSR
            next: {
                revalidate: 3600    // ISR
            }
        }
    })
    return detailBook
}