import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // リクエストからタイトルと値段を取得する
        const { title, price, bookId, userId } = await request.json()
        const headerList = await headers()
        const origin = headerList.get('origin')
        // console.log("タイトルと値段", title, price)
        // console.log("origin:", origin)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            metadata: {
                bookId
            },
            client_reference_id: userId,
            line_items: [
                {
                    price_data: {
                        currency: 'jpy',
                        product_data: {
                            name: title
                        },
                        unit_amount: price
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `${origin}/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/canceled=true`
        })
        return NextResponse.json({ url: session.url })
    } catch (err) {
        const errMsg = err instanceof Error ? err.message : "購入処理でエラーが発生しました。"
        const statusCode = err && typeof err === 'object' && 'statusCode' in err ?
            (err as { statusCode: number }).statusCode : 500
        return NextResponse.json(
            { error: errMsg },
            { status: statusCode }
        )
    }
}