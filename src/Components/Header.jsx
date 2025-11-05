import React, { use, useEffect, useState } from 'react'
import { Aperture, Menu, Sun, MoonStar, Thermometer } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

function Header() {

    const [menu, setMenu] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setMenu(true);
            } else {
                setMenu(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Log initial width
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkTheme ? "dark" : "base"
        );
    }, [darkTheme]);

    return (
        <header className='fixed w-full z-20 flex px-7 md:px-12 py-3 bg-base text-primary border-b-1 border-border'>
            <h1 className='flex items-center gap-2 text-2xl font-bold'>
                <Aperture />
                <span className='w-max'>Smart Study</span>
            </h1>

            <div className={`bg-base sm:border-none border-2 border-border font-semibold absolute top-14 transition-all duration-300 ease-in-out ${menu ? 'h-auto opacity-100' : 'h-0 opacity-0 pointer-events-none'} left-0 w-screen sm:static p-6 sm:p-0 flex items-start gap-y-4 flex-col sm:flex-row sm:items-center sm:justify-end space-x-3 text-sm lg:text-[16px] list-none`}>
                <NavLink className='group' to='/'>
                    <span className='relative p-1'>Home
                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-300'></span>
                    </span>
                </NavLink>
                <NavLink className='group' to='/text-extractor'>
                    <span className='relative p-1'>MCQ AI
                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-300'></span>
                    </span>
                </NavLink>
                <NavLink className='group' to='/study'>
                    <span className='relative p-1'>About
                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-300'></span>
                    </span>
                </NavLink>
                <button className='bg-brand w-1/3 sm:w-max px-3 py-1 rounded-md text-white font-semibold'>Sign Up</button>
                <button className='border-2 w-1/3 sm:w-max px-3 py-1 bg-secondary text-bg font-semibold rounded-md'>Log In</button>
                <button className='ml-1 shadow-md shadow-gray-500 sm:static absolute p-[6px] rounded-xl border border-border  top-4 right-7' onClick={() => setDarkTheme(!darkTheme)}>
                    {darkTheme ? <Sun className='text-brand' /> : <MoonStar className='text-brand' />}
                </button>

            </div>

            <div className='flex items-center ml-auto sm:hidden' onClick={() => setMenu(!menu)}>
                <Menu />
            </div>


        </header>
    )
}

export default Header