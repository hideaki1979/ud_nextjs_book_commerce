import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /purchase/:userId
 * @summary Purchases for a specific user
 * @param {string} userId - User ID
 * @returns {object[]} Purchases
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params

    try {
        const purchases = await prisma.purchase.findMany({
            where: { userId }
        })
        return NextResponse.json(purchases)
    } catch (err) {
        return NextResponse.json(err)
    }
}