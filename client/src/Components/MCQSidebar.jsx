import axios from "axios";
import { ArrowRightFromLine, Bell, Bookmark, Home, Plus, Search, Settings, SidebarIcon, UserCircle, } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function MCQSidebar() {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(true);
    const [darkTheme, setDarkTheme] = useState(false);
    const [titles, setTitles] = useState();
   

    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:5000/api/quizzes/titles`);
            console.log(res.data);
            setTitles(res.data);
        })();
    }, [])

    async function loadMCQ(title) {
        const res = await axios.get(`http://localhost:5000/api/quizzes/quiz?title=${title}`);
        console.log(res.data);
        const questions = res.data;
        navigate('/quiz', { state: questions })
    }

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkTheme ? "dark" : "light"
        );
    }, [darkTheme]);

    const menuItems = [
        { icon: <Home />, label: "Home", path: '/' },
        { icon: <Plus />, label: "Create", path: '/text-extractor' },
        { icon: <Bell />, label: "Notifications" },
        { icon: <Bookmark />, label: "Bookmarks" },
        { icon: <Settings />, label: "Settings" },
    ];

    const bottomItems = [
        { icon: <UserCircle />, label: "Profile" },
        { icon: <ArrowRightFromLine />, label: "Logout" },
    ];

    return (
        <section>
            <SidebarIcon
                onClick={() => setIsOpen(prev => !prev)}
                className="z-99 fixed top-3 left-2 bg-layer border border-border text-primary size-9 p-1 rounded-lg"
            />
            <div
                className={`fixed top-0 left-0 overflow-auto h-screen ${isOpen ? "w-60 p-4 bg-base" : "w-0 opacity-0 pointer-events-none p-2 sm:bg-base"} mt-15 space-y-2 border border-border transition-all duration-600`}
            >
                <nav className="pb-5 flex flex-col justify-between h-8/10">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => (
                            <NavLink
                                to={item.path}
                                key={index}
                                className={`${isOpen ? 'hidden sm:flex' : 'flex'} text-primary hover:bg-hover items-center gap-3 font-semibold p-3 rounded-md transition-all`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </ul>

                    <ul className="space-y-2">
                        {bottomItems.map((item, index) => (
                            <NavLink
                                key={index}
                                className={`${isOpen ? 'hidden sm:flex' : 'flex'} text-primary hover:bg-hover items-center gap-3 font-semibold p-3 rounded-md transition-all`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                        <li className="flex gap-3" onClick={() => setDarkTheme(prev => !prev)}>
                            <span>Dark Theme</span>
                            <div className={`flex relative bg-primary w-14 h-6 rounded-2xl`}>
                                <span className={`absolute ${darkTheme ? 'translate-x-0' : 'translate-x-8'} transition-all h-full aspect-square rounded-full bg-orange-500`}></span>
                            </div>
                        </li>
                    </ul>
                    <hr />
                    <div className='flex flex-col gap-3'>
                        <h3 className='text-muted font-semibold text-sm'>Quizzes-</h3>
                        <div className='flex gap-4 text-muted bg-layer px-3 py-2 rounded-md border  shadow-sm border-border'>
                            <Search />
                            <span>Search</span>
                        </div>
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
                </nav>
            </div>
        </section>
    );
}

export default MCQSidebar;
