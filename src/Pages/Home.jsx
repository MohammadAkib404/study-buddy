import { ChartNoAxesCombined, ChartSpline } from 'lucide-react'
import React from 'react'

function Home() {
    return (
        <main className='bg-base py-15 space-y-35'>
            <section className='w-full bg-base pt-20 max-[400px]:p-6 p-10 lg:p-15 border-b border-hightlight'>
                <div className='flex flex-col-reverse md:grid md:grid-cols-[60%_40%] gap-5 rounded-3xl max-w-[2000px] md:bg-layer md:border border-border md:p-10 2xl:p-20 2xl:mx-auto'>
                    <div className='text-primary font-semibold my-auto space-y-4 2xl:space-y-8'>
                        <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl'>Learn anything <p className='font-bold'>Effortlessly</p></h1>
                        <p className='max-w-2xl w-full text-muted text-md md:text-lg xl:text-2xl'>Simplify tough topics, revise at lightning speed, and enjoy learning with a tool built for focus and fun.</p>
                        <div className='space-x-4 space-y-2 mt-6 2xl:space-y-12 2xl:text-3xl'>
                            <button className='bg-brand shadow-lg shadow-brand/50 py-2 2xl:py-4 px-4 2xl:px-10 rounded-lg text-gray-50'>Get Started</button>
                            <button className='border-2 border-secondary py-2 2xl:py-4 px-4 2xl:px-10 rounded-lg'>Learn More</button>
                        </div>
                    </div>
                    <div>
                        <img className='mx-auto w-8/10 md:w-full' src="./image.png" alt="img" />
                    </div>
                </div>
            </section>
            <section className='h-60 bg-compliment text-primary py-auto'>
                <div className='flex justify-around items-center h-full max-w-8/10 m-auto my-auto'>
                    <div className='inline-flex justify-between bg-base h-6/10 w-3/10 rounded-md p-5 shadow-xl'>
                        <div>
                            <h6 className='font-semibold '>Hours Saved <span className='font-normal text-muted'>/ Day</span></h6>
                            <h4 className='mt-4 text-xl font-bold'>1200+</h4>
                            <div className='flex space-x-1 font-semibold text-xs mt-1.5'>
                                <ChartNoAxesCombined size={15} className='text-green-500 border-2 border-green-600 rounded-md p-0.5' />
                                <p className='text-green-500'>+23</p>
                                <p className='font-normal text-muted'>efficient</p>
                            </div>
                        </div>
                        <ChartNoAxesCombined size={80} strokeWidth={1} color='green' className='bg-layer rounded-md' />
                    </div>
                    <div className='inline-flex justify-between bg-base h-6/10 w-3/10 rounded-md p-5 shadow-xl'>
                        <div>
                            <h6 className='font-semibold '>Hours Saved <span className='font-normal text-muted'>/ Day</span></h6>
                            <h4 className='mt-4 text-xl font-bold'>1200+</h4>
                            <div className='flex space-x-1 font-semibold text-xs mt-1.5'>
                                <ChartNoAxesCombined size={15} className='text-green-500 border-2 border-green-600 rounded-md p-0.5' />
                                <p className='text-green-500'>+23</p>
                                <p className='font-normal text-muted'>efficient</p>
                            </div>
                        </div>
                        <ChartNoAxesCombined size={80} strokeWidth={1} color='green' className='bg-layer rounded-md' />
                    </div>
                    <div className='inline-flex justify-between bg-base h-6/10 w-3/10 rounded-md p-5 shadow-xl'>
                        <div>
                            <h6 className='font-semibold '>Hours Saved <span className='font-normal text-muted'>/ Day</span></h6>
                            <h4 className='mt-4 text-xl font-bold'>1200+</h4>
                            <div className='flex space-x-1 font-semibold text-xs mt-1.5'>
                                <ChartNoAxesCombined size={15} className='text-green-500 border-2 border-green-600 rounded-md p-0.5' />
                                <p className='text-green-500'>+23</p>
                                <p className='font-normal text-muted'>efficient</p>
                            </div>
                        </div>
                        <ChartNoAxesCombined size={80} strokeWidth={1} color='green' className='bg-layer rounded-md' />
                    </div>
                </div>
            </section>
            <div className='space-y-30'>
                <section className='w-8/10 mx-auto grid grid-cols-2 gap-x-15'>
                    <div className='space-y-10'>
                        <h3 className='font-bold text-3xl text-primary'>Every Class, Every Test, One Study App</h3>
                        <p className='text-muted font-semibold'>
                            Create your own flashcards or find sets made by teachers, students, and experts. Study them anytime, anywhere with our free app.
                        </p>
                        <div className='space-x-3'>
                            <button className='bg-primary text-base font-bold px-6 py-3 rounded-lg'>Try Now</button>
                            <button className='border-2 border-primary text-primary font-bold px-5 py-3 rounded-lg'>Learn More</button>
                        </div>
                    </div>
                    <div className='bg-red-500'>
                        <img src="./hero1.png" alt="" />
                    </div>
                </section>
                <section className='w-8/10 mx-auto grid grid-cols-2 gap-x-15'>
                    <div className='bg-red-500'>
                        <img src="./hero2.png" alt="" />
                    </div>
                    <div className='space-y-10'>
                        <h3 className='font-bold text-3xl text-primary'>Make class material instantly studiable</h3>
                        <p className='text-muted font-semibold'>
                            Turn your slides, videos, and notes into flashcard sets, practice tests, and study guides.
                        </p>
                        <button className='bg-brand text-gray-50 font-bold px-6 py-3 rounded-lg shadow-md shadow-brand'>Generate MCQ</button>
                    </div>
                </section>
                <section className='w-8/10 mx-auto grid grid-cols-2 gap-x-15'>
                    <div className='space-y-10'>
                        <h3 className='font-bold text-3xl text-primary'>Test prep for any subject</h3>
                        <p className='text-muted font-semibold'>
                            Memorize anything with personalized practice tests and study sessions in Learn. 98% of students say Quizlet has improved their understanding.
                        </p>
                        <button className='bg-brand text-gray-50 font-bold px-6 py-3 rounded-lg shadow-md shadow-brand'>See Stats</button>
                    </div>
                    <div className='bg-red-500'>
                        <img src="./hero1.png" alt="" />
                    </div>
                </section>


                

            </div>
        </main >
    )
}

export default Home
