import { useState } from 'react'
import Input from './Input'

import { FileText, Image } from 'lucide-react';

export default function WorkArea() {

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    if(!e.currentTarget.contains(e.relatedTarget)){
      setIsDragging(false);
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      // extractTextFromPDF(file);
      console.log(file);
    } else {
      console.log("Please drop a valid PDF file");
    }
  }

  return (
    <main onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className="h-full pt-[25vh]">
     <div className='w-full flex flex-col items-center'>
      <strong className='text-[28px] font-semibold'>What do you want to Create?</strong>
     <p className='mb-8 text-muted'>Upload your materials or type a topic to generate assessment.</p>
     <Input/>
     <div className={`${isDragging? "opacity-100 backdrop-blur-xs" : "opacity-0 backdrop-blur-none"} transition-all duration-400 flex flex-col gap-4 items-center pt-[30vh] bg-base/70 pointer-events fixed left-0 top-0 z-99 w-screen h-screen`}>
      <div className='flex gap-5'>
      <Image className='size-20 bg-transparent rounded-md -rotate-10'/>
        <FileText className='size-20 rotate-30 '/>
      </div>
      <h1 className='font-bold text-4xl mt-8'>Add Anything</h1>
      <p className='text-muted font-bold text-xl'>Drop Files Here (PDF, Docx, Text)</p>
     </div>
     </div>
    </main>
  )
}
