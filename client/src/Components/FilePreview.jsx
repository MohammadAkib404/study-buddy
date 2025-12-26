import { File } from "lucide-react";

export default function FilePreview({fileData}) {
  return (
    <div className="bg-layer w-38 h-15 px-3 py-2 rounded-lg">
      <h4 className="font-semibold text-sm">{fileData.name}</h4>
      <File className="inline mr-2 size-5" />
      <span className="text-xs text-muted font-semibold">{fileData.type}</span>
    </div>
  );
}
