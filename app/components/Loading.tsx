'use client'
import React from 'react'
import { ClipLoader } from 'react-spinners'

/**
 * This component renders a loading spinner using the ClipLoader from react-spinners.
 * The spinner is centered both vertically and horizontally on the screen.
 * It has a size of 50 and a color of #8dddd8.
 * 
 * このコンポーネントは、react-spinnersのClipLoaderを使用してロードスピナーをレンダリングします。
 * スピナーは画面上で垂直方向および水平方向に中央に配置されます。
 * サイズは50で、色は#8dddd8です。
 */

const LoadingSpinner = () => {
    //Spinnerのサイズと色
    const size = 50
    const color = "#8dddd8"
    return (
        <div className='spinner-container flex items-center justify-center min-h-screen'>
            <ClipLoader size={size} color={color} />
            {/* スタイル */}
            <style jsx>{`
                .spinner-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh
                }
            `}</style>
        </div>
    )
}

export default LoadingSpinner