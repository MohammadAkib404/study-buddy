import { Check, ChevronDown, CircleCheckBigIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function Select(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(0);

  const optionsRef = useRef(null);

  useEffect(() => {
    console.log(props.options[selectedOption]);
    props.setVariator((prev) => ({
      ...prev,
      [props.name]: props.options[selectedOption],
    }));
  }, [selectedOption]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex relative p-3 rounded-xl">
      <h3 className="font-bold text-muted mb-3 w-3/4">{props.label}</h3>
      <div ref={optionsRef} className="w-full">
        <div className="flex justify-between w-full border px-4 py-2" onClick={() => setIsMenuOpen((prev) => !prev)}>
          <p className="font-semibold">{props.options[selectedOption]}</p>
          <ChevronDown color="gray" />
        </div>
        <ul
          className={`bg-bg absolute w-full ${
            isMenuOpen ? "scale-100 opacity-100 shadow-lg shadow-border" : "scale-90 opacity-0 pointer-events-none"
          } z-99 transition-all duration-200 border border-border rounded-lg p-1 shadow-lg`}
        >
          {props.options.map((opt, id) => (
            <li
              key={id}
              className="flex justify-between p-2 rounded-md hover:bg-hover"
              onClick={(e) => {
                setSelectedOption(id);
                setIsMenuOpen(false);
              }}
            >
              <span>{opt}</span>
              {selectedOption === id && <CircleCheckBigIcon className="text-green-400 bg-green-400/20 size-7 p-[3px] rounded-lg" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
