import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Attachments({handleFileChange}) {

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  }

  const handleUpload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    handleFileChange(files);
    setIsOpen(false);
  }

  return (
    <div className="relative flex items-center gap-2 py-2 text-sm">
      <button onClick={toggleOpen} className="flex items-center gap-2">
        <Plus className="bg-primary text-white rounded-full p-1 size-6" />
        <span>Add Materials</span>
      </button>
      {isOpen && <div ref={ref} className="absolute w-30 top-9 flex flex-col bg-base px-2 py-2 border border-border rounded-lg">
        <div>
          <input type="file" id="file-input" className="hidden" multiple max={2} onChange={handleUpload} />
          <label htmlFor="file-input">Add PDF</label>
        </div>
        <span>Use Mart</span>
        <span>Add files</span>
        <span>Use Mart</span>
      </div>}
    </div>
  );
}
