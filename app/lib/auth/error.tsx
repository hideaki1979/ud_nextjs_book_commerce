"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errors: { [key: string]: string } = {
    Configuration: "認証の設定に問題があります。",
    AccessDenied: "アクセスが拒否されました。",
    OAuthSignin: "OAuthサインインでエラーが発生しました。",
    OAuthCallback: "OAuthコールバック中にエラーが発生しました。",
    OAuthCreateAccount: "OAuth アカウント作成中にエラーが発生しました。",
    Callback: "コールバック処理中にエラーが発生しました。",
    OAuthAccountNotLinked: "このメールアドレスは別の認証プロバイダと紐づいています。",
    Default: "認証中に予期しないエラーが発生しました。"
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='bg-red-50 p-4 rounded-md'>
        <h1 className='text-red-700 text-2xl font-bold mb-4'>
          認証エラー
        </h1>
        <p className='text-red-600'>
          {errors[error || "Default"]}
        </p>
      </div>
    </div>
  )
}
