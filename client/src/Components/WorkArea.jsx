import { useState } from 'react'
import Input from './Input'

import { ArrowDown, FileText, Image } from 'lucide-react';
import FilesPreview from './FilesPreview';
import Attachments from './Attachments';
import TopicVisualizer from './TopicVisualizer';

export default function WorkArea() {

  const data = {
    title: "Pastoralists in the Modern World",
    sectionLevel: "Chapter",
    children: [
      {
        title: "Pastoral Nomads and Their Movements",
        sectionLevel: "Main-Topic",
        children: [
          {
            title: "The Banjaras",
            sectionLevel: "Topic",
            children: [
              { title: "Long-distance migration routes", sectionLevel: "Sub-Topic" },
              { title: "Role in grain transport", sectionLevel: "Sub-Topic" },
              { title: "Supply of goods to towns", sectionLevel: "Sub-Topic" },
              { title: "Support to armies during wars", sectionLevel: "Sub-Topic" }
            ]
          },
          {
            title: "The Raikas",
            sectionLevel: "Topic",
            children: [
              { title: "Camel and sheep herding", sectionLevel: "Sub-Topic" },
              { title: "Seasonal grazing cycles", sectionLevel: "Sub-Topic" },
              { title: "Dependence on rainfall", sectionLevel: "Sub-Topic" },
              { title: "Relationship with farmers", sectionLevel: "Sub-Topic" }
            ]
          },
          {
            title: "The Dhangars",
            sectionLevel: "Topic",
            children: [
              { title: "Movement between plateau and coast", sectionLevel: "Sub-Topic" },
              { title: "Sheep rearing practices", sectionLevel: "Sub-Topic" },
              { title: "Use of monsoon pastures", sectionLevel: "Sub-Topic" },
              { title: "Seasonal employment patterns", sectionLevel: "Sub-Topic" }
            ]
          }
        ]
      },
      {
        title: "Colonial Rule and Pastoral Life",
        sectionLevel: "Main-Topic",
        children: [
          {
            title: "Grazing Laws",
            sectionLevel: "Topic",
            children: [
              { title: "Restriction on open grazing", sectionLevel: "Sub-Topic" },
              { title: "Taxation on grazing land", sectionLevel: "Sub-Topic" },
              { title: "Permit-based access", sectionLevel: "Sub-Topic" },
              { title: "Conflict with forest officials", sectionLevel: "Sub-Topic" }
            ]
          },
          {
            title: "Forest Acts",
            sectionLevel: "Topic",
            children: [
              { title: "Reserved forest creation", sectionLevel: "Sub-Topic" },
              { title: "Bans on forest entry", sectionLevel: "Sub-Topic" },
              { title: "Loss of customary rights", sectionLevel: "Sub-Topic" },
              { title: "Forced route changes", sectionLevel: "Sub-Topic" }
            ]
          },
          {
            title: "Criminal Tribes Act",
            sectionLevel: "Topic",
            children: [
              { title: "Communities branded criminal", sectionLevel: "Sub-Topic" },
              { title: "Mandatory registration", sectionLevel: "Sub-Topic" },
              { title: "Constant police surveillance", sectionLevel: "Sub-Topic" },
              { title: "Loss of social freedom", sectionLevel: "Sub-Topic" }
            ]
          }
        ]
      }
    ]
  }

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([])
  const [prompt, setPrompt] = useState("");

  // #region File Handling Logic
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
    setSelectedFiles(prev => prev ? [...prev, ...data] : data);
  };
  // #endregion



  return (
    <main onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className="h-full pt-[25vh]">
      <div className='w-full flex flex-col items-center'>
        <strong className='text-[28px] font-semibold'>What do you want to Create?</strong>
        <p className='mb-8 text-muted'>Upload your materials or type a topic to generate assessment.</p>

        <div className='w-7/10 flex flex-col border border-border rounded-2xl'>
          {selectedFiles.length > 0 ? <FilesPreview selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} /> : ""}
          <Input prompt={prompt} setPrompt={setPrompt} />
          <div className='flex justify-between items-center px-3 py-1'>
            <Attachments setSelectedFiles={setSelectedFiles} fileStatus={fileStatus} />
            <ArrowDown className='bg-primary text-white rounded-full p-1 size-8' />
          </div>
        </div>
      </div>
      {/* Drop Overlay */}
      <div className={`${isDragging ? "opacity-100 backdrop-blur-xs" : "opacity-0 backdrop-blur-none"} pointer-events-none transition-all duration-400 flex flex-col gap-4 items-center pt-[30vh] bg-base/70 pointer-events fixed left-0 top-0 z-99 w-screen h-screen`}>
        <div className='flex gap-5'>
          <Image className='size-20 bg-transparent rounded-md -rotate-10' />
          <FileText className='size-20 rotate-30 ' />
        </div>
        <h1 className='font-bold text-4xl mt-8'>Got Documents?</h1>
        <p className='text-muted font-bold text-xl'>Upload up to 6 files(PDF, Docx, Txt)</p>
      </div>
      {/* Topic Tree  */}
      <TopicVisualizer data={data} />
    </main>
  )
}
