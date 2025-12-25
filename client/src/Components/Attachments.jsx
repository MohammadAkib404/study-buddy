import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Attachments() {

const [isOpen, setIsOpen] = useState(false);
const ref = useRef(null);

useEffect(() => {
    const handleClickOutside = (e) => {
        if(ref.current && !ref.current.contains(e.target)){
            setIsOpen(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => document.removeEventListener("mousedown", handleClickOutside)
}, [])

const toggleOpen = () => {
    setIsOpen(prev => !prev);
}

  return (
    <div className="relative flex items-center gap-2 py-2 text-sm">
      <button onClick={toggleOpen} className="flex items-center gap-2">
        <Plus className="bg-primary text-white rounded-full p-1 size-6" />
        <span>Add Materials</span>
      </button>
      {isOpen && <div ref={ref} className="absolute w-25 top-9 flex flex-col bg-base px-2 py-2 border border-border rounded-lg">
        <span>Add files</span>
        <span>Use Mart</span>
        <span>Add files</span>
        <span>Use Mart</span>
      </div>}
    </div>
  );
}
