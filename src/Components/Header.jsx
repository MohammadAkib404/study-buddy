import React, { useEffect, useState } from 'react'
import { Icon } from "@iconify/react";
import { Link, NavLink } from 'react-router-dom';

function Header() {

    const [menu, setMenu] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) {
                setMenu(true);
            } else{
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


    return (
        <header className='flex justify-between px-8 md:px-12 py-3 bg-bg-default text-text-primary border-b-1 border-border'>
            <h1 className='flex items-center gap-2 text-2xl font-bold'>
                <Icon icon="devicon:tailwindcss" width="30" height="30" />
                <span className='w-max'>Smart Study</span>
            </h1>

            <div className={`bg-bg-default font-semibold absolute top-15 transition-all duration-300 ease-in-out ${menu ? 'h-6/10 opacity-100' : 'h-0 opacity-0'} left-0 w-screen sm:static p-6 sm:p-0 flex items-start gap-y-4 flex-col sm:flex-row sm:items-center sm:justify-end space-x-4 list-none`}>
                <NavLink className='group' to='/'>
                    <span className='relative p-1'>Home
                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300'></span>
                    </span>
                </NavLink>
                <NavLink className='group' to='/text-extractor'>
                    <span className='relative p-1'>MCQ Generator
                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300'></span>
                    </span>
                </NavLink>
                <NavLink className='group' to='/study'>
                    <span className='relative p-1'>About
                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300'></span>
                    </span>
                </NavLink>
                <button className='bg-accent w-1/3 sm:w-max px-3 py-1 rounded-md text-bg font-semibold'>Sign Up</button>
                <button className='border-2 w-1/3 sm:w-max px-3 py-1 bg-secondary text-bg font-semibold rounded-md'>Log In</button>
            </div>

            <div className='flex items-center sm:hidden' onClick={() => setMenu(!menu)}>
                <Icon icon="uil:bars" width="30" height="30" />
            </div>

        </header>
    )
}

export default Header
