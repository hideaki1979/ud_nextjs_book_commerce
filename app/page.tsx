// "use client"

import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { BookType, PurchaseType } from "./types/types";
import { nextAuthOptions } from "./lib/next-auth/options";


export default async function Home() {
  // 疑似データ→本番データ
  const { contents } = await getAllBooks()
  const session = await getServerSession(nextAuthOptions)
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
    <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20 ">
      <h2 className="text-center w-full font-bold text-3xl mb-4">
        Book Commerce
      </h2>
      {contents.map((book: BookType) => (
        <Book
          key={book.id}
          book={book}
          isPurchase={purchaseBookIds.includes(book.id)}
        />
      ))}
    </main>
  );
}
