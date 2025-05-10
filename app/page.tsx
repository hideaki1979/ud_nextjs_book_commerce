// "use client"

import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { BookType, PurchaseType } from "./types/types";
import { auth } from "./lib/auth/auth";

/**
 * Homeコンポーネントは、MicroCMSに保存された本の情報を取得し、
 * 現在のユーザーが購入した本かどうかを判定してBookコンポーネントに渡します。
 * 
 * @returns {JSX.Element}
 *   BookCommerceのトップページコンポーネント
 */
export default async function Home() {
  // 疑似データ→本番データ
  const { contents } = await getAllBooks()
  const session = await auth()
  const user = session?.user

  let purchaseBookIds: string[] = [];

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchase/${user?.id}`,
      { cache: "no-store" } // SSR
    )
    const purchasesData = await response.json()
    // console.log(purchasesData)

    purchaseBookIds = purchasesData.map((purchaseBook: PurchaseType) => purchaseBook.bookId)
    // console.log(purchaseBookIds)
  }

  return (
    <main className="flex flex-wrap justify-center items-center md:mt-24 mt-16 ">
      <h2 className="text-center w-full font-bold text-3xl mb-8">
        Book Commerce
      </h2>
      {contents.map((book: BookType) => (
        <Book
          key={book.id}
          book={book}
          isPurchase={purchaseBookIds.includes(book.id)}
          user={user}
        />
      ))}
    </main>
  );
}
