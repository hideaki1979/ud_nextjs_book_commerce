import React from 'react'

const NotFound = () => {
    return (
        <div className='flex items-center justify-center min-h-screen h-screen'>
            <div className='bg-gray-100 p-8 rounded-md w-full h-full flex flex-col justify-center'>
                <h1 className='text-2xl font-bold mb-4 text-black text-center'>
                    404 Not Found
                </h1>
                <p className='text-xl font-semibold text-black text-center'>
                    お探しのページは存在しません。
                </p>
            </div>
        </div>
    )
}

export default NotFound