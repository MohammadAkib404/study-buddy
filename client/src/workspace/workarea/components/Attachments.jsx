import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Attachments({ handleFileChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null)

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !btnRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleUpload = (e) => {
    const files = e.target.files;
    handleFileChange(files);
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center gap-2 py-2 text-sm">
      <button ref={btnRef} onClick={toggleOpen} className="flex items-center gap-2">
        <Plus className="text-primary rounded-full p-1 size-8" />
      </button>
      {isOpen && (
        <div ref={menuRef} className="absolute w-30 top-9 flex flex-col bg-bg px-2 py-2 border border-border rounded-lg">
          <div>
            <input type="file" id="file-input" className="hidden" multiple max={2} onChange={handleUpload} />
            <label htmlFor="file-input">Add PDF</label>
          </div>
          <span>Use Mart</span>
          <span>Add files</span>
          <span>Use Mart</span>
        </div>
      )}
    </div>
  );
}
