import React from 'react'

function Home() {
    return (
        <main className='w-full p-7 lg:p-15 border-b border-hightlight'>
            <div className='flex flex-col-reverse md:grid md:grid-cols-[60%_40%] gap-5 rounded-3xl max-w-[2000px] md:bg-gradient-to-br from-blue-100 to-indigo-100 xl md:p-10 2xl:mx-auto'>
                <div className='text-text-primary font-semibold my-auto space-y-4 2xl:space-y-8'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl'>Learn anything <p className='font-bold'>Effortlessly</p></h1>
                    <p className='max-w-2xl w-full text-text-secondary text-md md:text-lg xl:text-2xl'>Simplify tough topics, revise at lightning speed, and enjoy learning with a tool built for focus and fun.</p>
                    <div className='space-x-4 space-y-2 mt-6 2xl:space-y-12 2xl:text-3xl'>
                        <button className='bg-accent py-2 2xl:py-4 px-4 2xl:px-10 rounded-lg text-text'>Learn More</button>
                        <button className='border-2 border-secondary py-2 2xl:py-4 px-4 2xl:px-10 rounded-lg'>Get Started</button>
                    </div>
                </div>
                <div>
                    <img className='mx-auto w-8/10 md:w-full' src="./image.png" alt="img" />
                </div>
            </div>
        </main>
    )
}

export default Home
