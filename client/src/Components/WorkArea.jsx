import { useState } from 'react'
import Input from './Input'

import { ArrowDown, FileText, Image } from 'lucide-react';
import FilesPreview from './FilesPreview';
import Attachments from './Attachments';

export default function WorkArea() {

  const [isDragging, setIsDragging] = useState(false);
  const [filesData, setFilesData] = useState([])

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  }

  const fileStatus = (file) => {
    if (!file || !file.name) return null;

    const parts = file.name.trim().split(".");
    if (parts.length < 2) return null; // no extension found

    let name = parts.shift();
    const MAX_LENGTH = 18;
    if (name.length > MAX_LENGTH) {
      const namePart = name.slice(0, MAX_LENGTH - 3);
      name = namePart + "..."
    }
    const ext = parts.pop().toLowerCase();

    const validTypes = ["pdf", "docx", "txt"];
    if (!validTypes.includes(ext)) return null;

    if (file.type) {
      if (ext === "pdf" && file.type !== "application/pdf") return null;
      if (ext === "docx" && file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return null;
    }

    return { name, type: ext.toUpperCase() };
  };


  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files
    if (files.length < 1) return console.log("Please Upload proper file")

    let data = [];
    for (const file of files) {
      const status = fileStatus(file);
      if (status) data.push(status);
    }
    console.log(data);
    setFilesData(prev => prev? [...prev, ...data] : data);
  };


  return (
    <main onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className="h-full pt-[25vh]">
      <div className='w-full flex flex-col items-center'>
        <strong className='text-[28px] font-semibold'>What do you want to Create?</strong>
        <p className='mb-8 text-muted'>Upload your materials or type a topic to generate assessment.</p>

        <div className='w-7/10 flex flex-col border border-border rounded-2xl'>
          {filesData.length > 0? <FilesPreview filesData={filesData} setFilesData={setFilesData} /> : ""}
          <Input />
          <div className='flex justify-between items-center px-3 py-1'>
            <Attachments setFilesData={setFilesData} fileStatus={fileStatus} />
            <ArrowDown className='bg-primary text-white rounded-full p-1 size-8' />
          </div>
        </div>

        <div className={`${isDragging ? "opacity-100 backdrop-blur-xs" : "opacity-0 backdrop-blur-none"} pointer-events-none transition-all duration-400 flex flex-col gap-4 items-center pt-[30vh] bg-base/70 pointer-events fixed left-0 top-0 z-99 w-screen h-screen`}>
          <div className='flex gap-5'>
            <Image className='size-20 bg-transparent rounded-md -rotate-10' />
            <FileText className='size-20 rotate-30 ' />
          </div>
          <h1 className='font-bold text-4xl mt-8'>Got Documents?</h1>
          <p className='text-muted font-bold text-xl'>Upload up to 6 files(PDF, Docx, Txt)</p>
        </div>
      </div>
    </main>
  )
}
