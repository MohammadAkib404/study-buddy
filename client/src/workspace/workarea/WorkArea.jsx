import { ArrowUp } from "lucide-react";
import { useFileUpload } from "./hooks/useFileUpload";
import { useGenerator } from "./hooks/useGenerator";
import FilesPreview from "./components/FilesPreview";
import FileInput from "./components/FileInput";
import Attachments from "./components/Attachments";
import DropOverlay from "./components/DropOverlay";
import OutType from "./components/OutType";
import TopicVisualizer from "./components/TopicVisualizer";
import Quiz from "../Quiz";
import Flashcards from "../Flashcards";
import { useState, useEffect } from "react";

export default function WorkArea() {
  const { files, filesData, isDragging, setIsDragging, addFiles, removeFile } = useFileUpload();
  const { topics, quiz, flashcards, generateTopics, generateByTopics, clearResults } = useGenerator(filesData);

  const [outputType, setOutputType] = useState("flashcards");
  // variator could be lifted from a form or passed as props later
  const variator = {};

  const handleTopicGeneration = () => {
    generateTopics();
  };

  const handleGenerateFromTopics = (selected) => {
    if (outputType === "quiz" || outputType === "flashcards") {
      generateByTopics(selected, variator, outputType);
    }
    // if outputType is "outline" we simply keep the topic tree visible
  };

  // wipe out previously generated data whenever the output type changes
  useEffect(() => {
    clearResults();
  }, [outputType, clearResults]);

  return (
    <main
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        addFiles(e.dataTransfer.files);
      }}
      className="h-full pt-[25vh]"
    >
      <div className="flex flex-col items-center">
        <header className="text-center">
          <strong className="text-[28px] font-semibold">What do you want to create?</strong>
          <p className="text-muted mb-8">Upload material to generate assessments.</p>
        </header>

        <section className="max-w-3xl w-8/10 border rounded-2xl px-3 py-3">
          {files.length ? <FilesPreview selectedFiles={files} removeFile={removeFile} /> : <FileInput handleFileChange={addFiles} />}
          <div className="flex justify-between items-center">
            <Attachments handleFileChange={addFiles} />
            <button onClick={handleTopicGeneration}>
              <ArrowUp className="bg-primary text-white rounded-full p-1.5 size-10" />
            </button>
          </div>
        </section>

        <OutType outputType={outputType} setOutputType={setOutputType} />
      </div>

      <DropOverlay visible={isDragging} />

      {topics && (
        <TopicVisualizer
          data={topics}
          onGenerate={outputType === "outline" ? undefined : handleGenerateFromTopics}
        />
      )}

      {outputType === "quiz" && quiz && <Quiz resData={quiz} />}
      {outputType === "flashcards" && flashcards && <Flashcards data={flashcards} />}
    </main>
  );
}
