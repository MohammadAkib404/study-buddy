import { useRef } from 'react'
import { ArrowDown, ChevronDown, Plus } from 'lucide-react'
import Attachments from './Attachments';

export default function Input() {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <section className='w-full flex justify-center'>
      <div className='w-7/10 flex flex-col border border-border rounded-2xl'>
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          placeholder="e.g: Generate a 10 question quiz on Photosynthesis for class 10th biology..."
          rows={1}
          className="w-full max-w-3xl min-h-[75px] max-h-[300px] px-3 pt-3 text-sm leading-relaxed resize-none overflow-auto focus:outline-none transition-[height] duration-150 ease-out"
        />
        <div className='flex bg-muted/10 justify-between items-center px-3 py-1'>
          <Attachments/>
          <ArrowDown className='bg-primary text-white rounded-full p-1 size-8' />
        </div>
      </div>
    </section>
  );
}
