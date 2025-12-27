import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Attachments({setFilesData, fileStatus}) {

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

  const handleFileChange = (e) => {
    e.preventDefault();

    const files = e.target.files;
    if(!files.length) return alert("Please Upload Proper File");

    const data = [];
    for (const file of files) {
      const status = fileStatus(file);
      if(status) data.push(status);
    }
    console.log(data);

    setFilesData(prev => prev? [...prev, ...data] : data);
    setIsOpen(false);

    console.log(files);
  }

  return (
    <div className="relative flex items-center gap-2 py-2 text-sm">
      <button onClick={toggleOpen} className="flex items-center gap-2">
        <Plus className="bg-primary text-white rounded-full p-1 size-6" />
        <span>Add Materials</span>
      </button>
      {isOpen && <div ref={ref} className="absolute w-30 top-9 flex flex-col bg-base px-2 py-2 border border-border rounded-lg">
        <div>
          <input type="file" id="file-input" className="hidden" accept="application/pdf" onChange={handleFileChange} />
          <label htmlFor="file-input">Add PDF</label>
        </div>
        <span>Use Mart</span>
        <span>Add files</span>
        <span>Use Mart</span>
      </div>}
    </div>
  );
}
