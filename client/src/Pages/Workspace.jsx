import React, { useRef, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import WorkspaceNav from '../Components/WorkspaceNav'
import WorkArea from '../Components/WorkArea'
import TextExtractor from './Text_Extractor';

export default function Workspace() {
  // Sidebar
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
        setIsOpen(prev => !prev);
  }

  return (
    <section className="flex w-full h-screen">
  <aside
    className={`${isOpen ? "fixed lg:sticky lg:w-60 z-99" : "w-0 lg:w-15"} transition-all duration-600`}
  >
    <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
  </aside>

  <div className="flex flex-col flex-1 min-w-0">
    <WorkspaceNav isOpen={isOpen} toggleSidebar={toggleSidebar} />
    <div className="flex-1">
      <WorkArea />
    </div>
  </div>
</section>

  )
}

