import { useRef } from 'react'
import { ArrowDown, File } from 'lucide-react'
import Attachments from './Attachments';
import FilePreview from './FilePreview';

export default function Input() {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <textarea
      ref={textareaRef}
      onInput={handleInput}
      placeholder="e.g: Generate a 10 question quiz on Photosynthesis for class 10th biology..."
      rows={1}
      className="w-full max-w-3xl min-h-[75px] max-h-[300px] px-3 pt-3 text-sm leading-relaxed resize-none overflow-auto focus:outline-none transition-[height] duration-150 ease-out"
    />
  );
}
