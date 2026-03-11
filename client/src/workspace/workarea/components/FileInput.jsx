import { ArrowDown, Upload } from "lucide-react";
import React from "react";

export default function FileInput({handleFileChange}) {
  return (
    <label htmlFor="file-input" className="h-40 p-1 bg- flex flex-col justify-center items-center gap-3">
      <Upload className="bg-layer p-2 size-12 rounded-full" />
      <input type="file" id="file-input" className="hidden" multiple max={2} onChange={(e) => handleFileChange(e.target.files)} />
      <span className="text-muted">Click or drag source File</span>
    </label>
  );
}
