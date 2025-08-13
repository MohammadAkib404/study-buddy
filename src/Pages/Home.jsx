import React from 'react'

function Home() {
    return (
        <main className='w-full py-15 border-b border-tertiary'>
           <div className='grid grid-cols-[60%_40%] max-w-9/10 mx-auto'>
                <div className='text-secondary font-semibold mt-15 space-y-4'>
                    <h1 className='text-5xl'>Learn anything <span className='font-bold'>Effortlessly</span></h1>
                    <p className='text-tertiary text-lg'>A Smart Study Tool that allows you to learn anything quickly and in a fun and entertaining way, it can be use to revise concepts, breakdown complex concepts, and learn topics fast</p>
                    <div className='space-x-4 mt-6'>
                        <button className='bg-accent py-2 px-4 rounded-lg text-bg'>Learn More</button>
                        <button className='border-2 border-secondary px-4 py-2 rounded-lg'>Get Started</button>
                    </div>
                </div>
                <div>
                    <img className='w-full' src="./image.png" alt="img" />
                </div>
           </div>
        </main>
    )
}

export default Home
