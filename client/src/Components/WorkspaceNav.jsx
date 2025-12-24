import { AlignLeft, ChevronDown } from "lucide-react";
import Profile from "./Profile";
import { useEffect, useState } from "react";

export default function WorkspaceNav({ toggleSidebar }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        sticky top-0 z-50 h-12 w-full
        flex justify-between items-center px-5
        bg-base transition-[border] duration-200
        ${scrolled ? "border-b border-border" : "border-b border-transparent"}
      `}
    >
      <strong className="flex items-center">
        <AlignLeft onClick={toggleSidebar} size={18} strokeWidth={2.5} className="mr-3" />
        <h1>Smart Study</h1>
        <ChevronDown />
      </strong>

      <div className="border p-2 rounded-3xl">Free Offer ߷</div>
      <Profile />
    </nav>
  );
}
