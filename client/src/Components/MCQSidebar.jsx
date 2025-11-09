import axios from 'axios';
import { Bell, Book, Layers, Mouse, Package, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function MCQSidebar() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [titles, setTitles] = useState();

    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:5000/api/names`);
            console.log(res.data);
            setTitles(res.data);
        })();
    }, [])

    const navigate = useNavigate();

    async function loadMCQ(title) {
        const res = await axios.get(`http://localhost:5000/api/mcq?title=${title}`);
        console.log(res.data);
        const questions = res.data;
        navigate('/quiz', { state: questions })
    }

    return (
        <>
            <div className={`bg-base p-5 fixed top-0 left-0 pt-20 border-r border-border  h-screen transition-all ease-out duration-400 ${sidebarOpen ? 'w-64 shadow-xl' : 'w-15 bg-transparent border-none shadow-none'}`}>
                <div className='bg-brand p-3 rounded-md text-white absolute top-18 right-2' onClick={() => setSidebarOpen(prev => !prev)}><Mouse /></div>
                <div className={`space-y-6 transition-all duration-1000 ${sidebarOpen ? 'opacity-100 block' : 'hidden opacity-0'}`}>
                    <div className='flex items-center gap-3'>
                        <Package />
                        <h2 className='font-bold text-lg'>Saved MCQ's</h2>
                    </div>
                    <div className='flex gap-4 text-muted bg-layer px-3 py-2 rounded-md border  shadow-sm border-border'>
                        <Search />
                        <span>Search</span>
                    </div>
                    <div className='space-y-2'>
                        <div className='flex gap-5'>
                            <Layers className='text-muted' />
                            <span className='font-semibold'>FlashCards</span>
                        </div>
                        <div className='flex gap-5'>
                            <Bell className='text-muted' />
                            <span className='font-semibold'>Notes</span>
                        </div>
                        <div className='flex gap-5'>
                            <Book className='text-muted' />
                            <span className='font-semibold'>MCQ's</span>
                        </div>
                    </div>
                    <hr />
                    <div className='flex flex-col gap-3'>
                        <h3 className='text-muted font-semibold text-sm'>Quizzes-</h3>
                        {titles && titles.map((title, id) => (
                            <span
                                key={id}
                                className={'cursor-pointer'}
                                onClick={() => loadMCQ(title)}
                                >
                                {title}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MCQSidebar
