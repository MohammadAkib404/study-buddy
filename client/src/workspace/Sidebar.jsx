import axios from "axios";
import { File, Home, Library, PenBox, Search, Settings, SidebarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const [darkTheme, setDarkTheme] = useState(false);
  const [quizInfo, setQuizInfo] = useState();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:5000/api/quizzes/titles`);
      console.log(data.content);
      setQuizInfo(data.content);
    })();
  }, []);

  const loadMCQ = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/quizzes/quiz?id=${id}`);
    console.log(res.data);
    const questions = res.data;
    navigate("/quiz", { state: questions });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  const menuItems = [
    { icon: <PenBox className="size-5"/>, label: "Create", path: "/text-extractor" },
    { icon: <Home className="size-5"/>, label: "Home", path: "/text-extractor" },
    { icon: <Library className="size-5" />, label: "Library" },
    { icon: <File className="size-5" />, label: "Flashcards" },
  ];

  const bottomItems = [
    { icon: <Settings className="size-5" />, label: "Settings" },
  ];

  return (
    <section
      className={`fixed h-screen ${
        isOpen ? "w-60 p-3 bg-bg" : "w-0 p-0 lg:w-12 lg:p-1 lg:bg-bg"
      } overflow-hidden space-y-2 border-r border-border transition-all duration-600`}
    >
      <div className="flex justify-between p-2 mb-5">
        <img onClick={toggleSidebar} src="./Logo.png" alt="logo" className="size-5" />
        <SidebarIcon onClick={toggleSidebar} className={`${isOpen ? "block" : "hidden"} size-5`} />
      </div>

      <nav className="h-[93%] flex flex-col justify-between">
        <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <NavLink to={item.path} key={index} className="flex text-primary hover:bg-hover items-center gap-3 font-semibold p-2 rounded-md transition-all">
            {item.icon}
            <span className={`${isOpen ? "block" : "hidden"}`}>{item.label}</span>
          </NavLink>
        ))}
      </ul>

      <ul className="space-y-2 mt-auto">
        {bottomItems.map((item, index) => (
          <NavLink to={item.path} key={index} className="flex text-primary hover:bg-hover gap-3 items-center font-semibold p-2 rounded-md transition-all">
            {item.icon}
            <span className={`${isOpen ? "block" : "hidden"}`}>{item.label}</span>
          </NavLink>
        ))}
      </ul>
      </nav>
    </section>
  );
}

export default Sidebar;
