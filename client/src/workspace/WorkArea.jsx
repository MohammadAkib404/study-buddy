import { useState } from "react";
import { AlignLeft, ArrowUp, CheckSquare, ChevronDown, CircleHelp, FileText, Image, Layers, ListTree, Settings } from "lucide-react";
import FilesPreview from "./FilesPreview";
import Attachments from "./Attachments";
import TopicVisualizer from "./TopicVisualizer";
import extractText from "../Utilities/extractText";
import { toast } from "react-toastify";
import { getQuiz, getTopics } from "../Utilities/API_Connection";
import Select from "./Select";
import FileInput from "./FileInput";
import OutType from "./OutType";

const selectData = [
  {
    label: "Quantity",
    options: [5, 10, 15, 20, 30, 50],
    name: "mcqAmount",
  },
  {
    label: "Quantity",
    options: [2, 3, 4, 5],
    name: "noOfOpt",
  },
  {
    label: "Quantity",
    options: ["Easy", "Medium", "Hard", "Extreme"],
    name: "noOfOpt",
  },
  {
    label: "Quantity",
    options: ["Test", "FlashCards", "True/False"],
    name: "noOfOpt",
  },
];

export default function WorkArea() {
  const [topics, setTopics] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [keys, setKeys] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [variator, setVariator] = useState({
    mcqAmount: "",
    noOfOpt: "",
    vocabularyLevel: "",
    difficultyLevel: "",
  });
  const [quiz, setQuiz] = useState(null);
  const [advanceOpen, setAdvanceOpen] = useState(null);

  // #region File Handling Logic
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const fileStatus = (file) => {
    if (!file || !file.name) return null;

    const key = `${file.name}_${file.size}_${file.lastModified}`;
    if (keys.includes(key)) return null;
    setKeys((prev) => [...prev, key]);

    const parts = file.name.trim().split(".");
    if (parts.length < 2) return null;

    let name = parts.shift();
    const MAX_LENGTH = 18;
    if (name.length > MAX_LENGTH) {
      const namePart = name.slice(0, MAX_LENGTH - 3);
      name = namePart + "...";
    }
    const ext = parts.pop().toLowerCase();

    const validTypes = ["pdf", "docx", "txt"];
    if (!validTypes.includes(ext)) return null;

    if (file.type) {
      if (ext === "pdf" && file.type !== "application/pdf") return null;
      if (ext === "docx" && file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return null;
    }

    return { name, type: ext.toUpperCase(), size: file.size };
  };

  const handleFileChange = async (files) => {
    if (files.length < 1) return console.log("Please Upload proper file");
    console.log(files[0]);

    const MAX_FILES = 5;
    const MAX_SIZE = 1024 * 1024 * 5;
    const filesArr = [...files].slice(0, MAX_FILES - selectedFiles.length);

    let totalSize = selectedFiles.reduce((acc, curr) => acc + curr.size, 0);

    filesArr.map((f) => {
      totalSize += f.size;
      if (totalSize >= MAX_SIZE) return toast.error("File Size Exceeded");
    });

    let filesSelected = [];
    let data = [];
    for (const file of filesArr) {
      const status = fileStatus(file);
      if (status) {
        filesSelected.push(status);
        const text = await extractText(file, status.type);
        data.push(text);
      }
    }
    console.log(filesData);
    console.log(data);
    setSelectedFiles((prev) => (prev ? [...prev, ...filesSelected] : filesSelected));
    setFilesData((prev) => (prev ? [...prev, ...data] : data));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const removeFile = (i) => {
    setKeys((prev) => prev.filter((_, index) => index !== i));
    setSelectedFiles((prev) => prev.filter((_, index) => index !== i));
  };

  // #endregion

  const generateTopics = async () => {
    const topics = await getTopics(filesData[0]);
    console.log(topics);
    setTopics(topics);
  };

  const generateQuiz = async (topics) => {
    console.log(filesData[0]);
    console.log(topics);
    console.log(variator);
    const quiz = await getQuiz(filesData[0], topics, variator);
    console.log(quiz);
    setQuiz(quiz);
  };

  return (
    <main onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className="h-full pt-[25vh]">
      <div className="w-full flex flex-col items-center">
        <div className="text-center">
          <strong className="text-[28px] font-semibold">What do you want to Create?</strong>
          <p className="mb-8 text-muted">Upload your materials or type a topic to generate assessment.</p>
        </div>

        <div className="max-w-3xl w-8/10 flex flex-col border border-border rounded-2xl px-3 py-3">
          {selectedFiles.length > 0 ? (
            <FilesPreview selectedFiles={selectedFiles} removeFile={removeFile} />
          ) : (
            <FileInput handleFileChange={handleFileChange} />
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <Attachments handleFileChange={handleFileChange} />

              <div className="flex items-center gap-1.5 text-sm">
                <Settings className="size-5" />
                <span>Settings</span>
              </div>
            </div>

            <button onClick={generateTopics}>
              <ArrowUp className="bg-primary text-white rounded-full p-1.5 size-10" />
            </button>
          </div>
        </div>

        <OutType/>
      </div>
      {/* Drop Overlay */}
      <div
        className={`${
          isDragging ? "opacity-100 backdrop-blur-xs" : "opacity-0 backdrop-blur-none"
        } pointer-events-none transition-all duration-400 flex flex-col gap-4 items-center pt-[30vh] bg-bg/70 pointer-events fixed left-0 top-0 z-99 w-screen h-screen`}
      >
        <div className="flex gap-5">
          <Image className="size-20 bg-transparent rounded-md -rotate-10" />
          <FileText className="size-20 rotate-30 " />
        </div>
        <h1 className="font-bold text-4xl mt-8">Got Documents?</h1>
        <p className="text-muted font-bold text-xl">Upload up to 6 files(PDF, Docx, Txt)</p>
      </div>

      {/* Topic Tree  */}
      {topics && <TopicVisualizer data={topics} generateQuiz={generateQuiz} />}
    </main>
  );
}
