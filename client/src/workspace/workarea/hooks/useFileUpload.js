import { useRef, useState } from "react";
import extractText from "../../../Utilities/extractText";
import { toast } from "react-toastify";

const VALID_TYPES = ["pdf", "docx", "txt"];
const MAX_FILES = 5;
const MAX_SIZE = 1024 * 1024 * 6;
const MAX_LENGTH = 18;

export function useFileUpload() {
  const [files, setFiles] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const keysRef = useRef(new Set());

  const validateFile = (file) => {
    const ext = file.name.split(".").pop().toLowerCase();
    const fileName = file.name.split(".").shift().slice(0, MAX_LENGTH);
    if (!VALID_TYPES.includes(ext)) return null;
    const key = `${file.name}_${file.size}_${file.lastModified}`;
    if (keysRef.current.has(key)) return null;
    keysRef.current.add(key);
    return { name: fileName, size: file.size, type: ext.toUpperCase() };
  };

  const addFiles = async (incoming) => {
    let totalSize = files.reduce((a, f) => a + f.size, 0);
    const accepted = [];
    const extracted = [];

    for (const file of [...incoming].slice(0, MAX_FILES - files.length)) {
      totalSize += file.size;
      if (totalSize > MAX_SIZE) return toast.error("File size exceeded");
      const meta = validateFile(file);
      if (!meta) continue;
      accepted.push(meta);
      extracted.push(await extractText(file, meta.type));
    }

    setFiles((p) => [...p, ...accepted]);
    setFilesData((p) => [...p, ...extracted]);
  };

  const removeFile = (index) => {
    setFiles((p) => p.filter((_, i) => i !== index));
    setFilesData((p) => p.filter((_, i) => i !== index));
  };

  return { files, filesData, isDragging, setIsDragging, addFiles, removeFile };
}
