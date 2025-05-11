import React from 'react'

const NotFound = () => {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='bg-gray-100 p-4 rounded-md shadow'>
                <h1 className='text-2xl font-bold mb-4'>
                    404 Not Found
                </h1>
                <p className='text-xl font-semibold'>お探しのページは存在しません。</p>
            </div>
        </div>
    )
}

export default NotFound