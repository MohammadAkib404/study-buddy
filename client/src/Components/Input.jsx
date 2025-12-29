import { useRef, useState } from 'react'
import { ArrowDown, File } from 'lucide-react'
import Attachments from './Attachments';
import FilePreview from './FilesPreview';

export default function Input({prompt, setPrompt}) {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
    console.log(e.target.value);
    setPrompt(e.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      onInput={handleInput}
      value={prompt}
      placeholder="e.g: Generate a 10 question quiz on Photosynthesis for class 10ᵗʰ biology..."
      rows={2}
      className="w-full max-w-3xl min-h-[40px] max-h-[300px] px-3 pt-3 text-sm leading-relaxed resize-none overflow-auto focus:outline-none transition-[height] duration-150 ease-out"
    />
  );
}
