import axios from "axios";
import { ArrowRightFromLine, Bell, Bookmark, Home, Plus, Search, Settings, SidebarIcon, UserCircle, } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({isOpen, toggleSidebar}) {
    const navigate = useNavigate();

    const [darkTheme, setDarkTheme] = useState(false);
    const [quizInfo, setQuizInfo] = useState();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`http://localhost:5000/api/quizzes/titles`);
            console.log(data.content);
            setQuizInfo(data.content);
        })();
    }, [])

    const loadMCQ = async (id) => {
        const res = await axios.get(`http://localhost:5000/api/quizzes/quiz?id=${id}`);
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
        <section className={`fixed h-screen ${isOpen ? "w-60 p-3 bg-base" : "w-0 p-0 sm:w-15 sm:p-1 sm:bg-base"} overflow-hidden space-y-2 border-r border-border transition-all duration-600`}
        >
            <nav className="flex justify-between px-1 mb-5">
                <img onClick={toggleSidebar} src="./Logo.png" alt="logo" className="size-7" />
                <SidebarIcon onClick={toggleSidebar} className={`${isOpen? "block" : "hidden"} `} />
            </nav>
            <ul className="space-y-2">
                {menuItems.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className="flex text-primary hover:bg-hover items-center gap-3 font-semibold p-2 rounded-md transition-all"
                    >
                        {item.icon}
                        <span className={`${isOpen? "block" : "hidden"}`}>{item.label}</span>
                    </NavLink>
                ))}
            </ul>

            <ul className="space-y-2">
                {bottomItems.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className="flex text-primary hover:bg-hover items-center gap-3 font-semibold p-3 rounded-md transition-all"
                    >
                        {item.icon}
                        <span className={`${isOpen? "block" : "hidden"}`}>{item.label}</span>
                    </NavLink>
                ))}
                {/* <li className="flex gap-3" onClick={() => setDarkTheme(prev => !prev)}>
                    <span>Dark Theme</span>
                    <div className={`flex relative bg-primary w-14 h-6 rounded-2xl`}>
                        <span className={`absolute ${darkTheme ? 'translate-x-0' : 'translate-x-8'} transition-all h-full aspect-square rounded-full bg-orange-500`}></span>
                    </div>
                </li> */}
            </ul>
             <div className='flex flex-col gap-3'>
                <h3 className='text-muted font-semibold text-sm'>Quizzes-</h3>
                <div className='flex gap-4 text-muted bg-layer px-3 py-2 rounded-md border  shadow-sm border-border'>
                    <Search />
                    <span>Search</span>
                </div>
                {quizInfo && quizInfo.map((info, id) => (
                    <span
                        key={id}
                        className={'cursor-pointer'}
                        onClick={() => loadMCQ(info.id)}
                    >
                        {info.title}
                    </span>
                ))}
            </div>
        </section>
    );
}

export default Sidebar;
