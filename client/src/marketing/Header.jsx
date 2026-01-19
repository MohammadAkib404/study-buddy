import { CodeSquare, Contact, Home, Mail, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../shared/Profile";

const navItems = [
  { id: "home", label: "Home", icon: <Home className="size-6" /> },
  { id: "about", label: "About", icon: <Contact className="size-6" /> },
  { id: "projects", label: "Projects", icon: <CodeSquare className="size-6" /> },
  { id: "contact", label: "Contact", icon: <Mail className="size-6" /> },
];

export default function Header({ active }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-bg w-full fixed shadow-msm z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center ">
        <div>
          <h1 className="font-serif font-bold text-4xl tracking-wider">Learnix</h1>
        </div>
        <nav className="gap-3 hidden sm:flex">
          {navItems.map((item) => (
            <div
              className={`flex gap-1.5 items-center px-4 py-2  rounded-xl text-sm hover:cursor-pointer ${
                active === item.id ? "bg-layer font-semibold shadow-msm scale-105" : "bg-bg"
              } transition-all`}
              onClick={() => scrollToSection(item.id)}
              key={item.id}
            >
              {item.icon} <span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="hidden sm:flex items-center gap-2">
          <Profile/>
        </div>
        <button className="block sm:hidden" onClick={() => setIsOpen((prev) => !prev)}>
          <Menu />
        </button>
      </div>
      <div className={`${isOpen ? "h-full overflow-auto" : "h-0 overflow-hidden"} w-full transition-all fixed`}>
        <nav className="block sm:hidden w-50 ml-auto px-3 py-2 rounded-xl bg-bg border border-border">
          {navItems.map((item) => (
            <div
              className={`flex gap-2 px-4 py-2 rounded-xl text-sm text-primary ${
                active === item.id ? "bg-layer font-semibold shadow-msm" : "bg-bg"
              } transition-all`}
              onClick={() => scrollToSection(item.id)}
              key={item.id}
            >
              {item.icon} <span>{item.label}</span>
            </div>

            
          ))}
          <div className="px-4 py-2 w-full">
            <button onClick={() => navigate("/register")} className="bg-primary text-bg font-semibold py-2 rounded-lg w-full">
              Login
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
