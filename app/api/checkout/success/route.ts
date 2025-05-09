import prisma from "@/app/lib/prisma";
import { stripe } from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

/**
 * Stripe Checkout Sessionの purchasae status が 
 * succeeded となった場合に実行される API
 * 
 * @param {NextRequest} request - NextRequest
 * @returns {NextResponse} - Stripe Checkout Sessionの情報を返す
 */
export async function POST(request: NextRequest) {
    const { sessionId } = await request.json()
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        // console.log(session)
        if (!session.client_reference_id || !session.metadata?.bookId) {
            throw new Error("userIdまたはbookIdが未設定です")
        }

        // 同じ書籍を購入しないように重複チェックを行う
        const hasPurchase = await prisma.purchase.findFirst({
            where: {
                userId: session.client_reference_id,
                bookId: session.metadata?.bookId
            }
        })

        // console.log(hasPurchase)

        if (!hasPurchase) {
            const purchase = await prisma.purchase.create({
                data: {
                    userId: session.client_reference_id,
                    bookId: session.metadata?.bookId
                }
            })
            return NextResponse.json(purchase)
        } else {
            return NextResponse.json({ message: "本書籍は既に購入済です。" })
        }

    } catch (error) {
        const errMsg = error instanceof Error ? error.message : "購入履歴登録処理時にエラーが発生しました。"
        return NextResponse.json(errMsg)
    }
}