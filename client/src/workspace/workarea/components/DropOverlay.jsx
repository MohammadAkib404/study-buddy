import { FileText, Image } from "lucide-react";

export default function DropOverlay({visible}) {
  return (
    <div
        className={`${
          visible ? "opacity-100 backdrop-blur-xs" : "opacity-0 backdrop-blur-none"
        } pointer-events-none transition-all duration-400 flex flex-col gap-4 items-center pt-[30vh] bg-bg/70 pointer-events fixed left-0 top-0 z-99 w-screen h-screen`}
      >
        <div className="flex gap-5">
          <Image className="size-20 bg-transparent rounded-md -rotate-10" />
          <FileText className="size-20 rotate-30 " />
        </div>
        <h1 className="font-bold text-4xl mt-8">Got Documents?</h1>
        <p className="text-muted font-bold text-xl">Upload up to 6 files(PDF, Docx, Txt)</p>
      </div>
  )
}
