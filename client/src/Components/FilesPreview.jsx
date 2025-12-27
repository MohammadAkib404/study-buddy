import { File, X } from "lucide-react";

export default function FilesPreview({ filesData, setFilesData }) {

  const removeFile = (i) => {
   setFilesData(prev => prev.filter((_, index) => index !== i));
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 max-h-45 overflow-y-scroll sm:overflow-auto gap-3 items-center px-3 py-2 w-auto'>
      {filesData?.map((data, i) => (
        <div key={i} className="bg-layer w-auto h-15 px-3 py-2 rounded-lg group">
          <div className="flex justify-between">
            <h4 className="font-semibold text-sm">{data.name}</h4>
            <button onClick={() => removeFile(i)}><X strokeWidth={3} className="size-5 bg-primary text-base p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100"/></button>
          </div>
          <File className="inline mr-2 size-5" />
          <span className="text-xs text-muted font-semibold">{data.type}</span>
        </div>
      ))}
    </div>

  );
}
