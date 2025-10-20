import React, { useState } from "react";
import { Upload, FileText, Download, Copy, AlertCircle, Plus, ChevronDown } from "lucide-react";
import getMCQ from "../API_Connection";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Select from "../Components/Select";

const TextExtractor = () => {

  const navigate = useNavigate();

  const selectData = [
    {
       question: 'Select the number of MCQs to Generate',
       options: [5, 10, 15, 20, 30, 50],
    },
    {
       question: 'Select number of Options in the MCQ',
       options: [2, 3, 4, 5]
       
    },
    {
       question: 'Select Vocabulary Level',
       options: ['Basic', 'Proficient', 'Expert', 'Elite'],
       multiselect: true,
       
    },
    {
       question: 'Select Difficulty Level',
       options: ['Beginner', 'Intermediate', 'Advanced', 'Elite'],
       multiselect: true,
       
    },
  ]

  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState(null);

  const generateMCQ = async (text) => {
    const res = await getMCQ(text);
    console.log('hi ')
    console.log(res);
    let mcq;
    try {
      mcq = typeof res === 'string' ? JSON.parse(res) : res;
    } catch (error) {
      console.error('Invalid Text was not Json', error)
    }
    setQuestions(mcq);
    console.log(mcq);
    console.log(res);
  };

  const extractTextFromPDF = async (file) => {
    try {
      setIsLoading(true);
      setError("");

      // Load PDF.js from CDN
      if (!window.pdfjsLib) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        document.head.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });

        // Set worker path
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;

      let fullText = "";

      // Extract text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
      }

      setExtractedText(fullText.slice(0, 30000));
      setFileName(file.name);
      setIsLoading(false);
      toast.success("Text Extracted from PDF");
      window.scrollTo({ top: 800, behavior: "smooth" });

      const id = toast.loading("Uploading file...");

      await generateMCQ(fullText);

      toast.update(id, {
        render: "Upload complete ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      setError(`Error extracting text: ${err.message}`);
      console.error("PDF extraction error:", err);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      extractTextFromPDF(file);
    } else {
      setError("Please select a valid PDF file");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      extractTextFromPDF(file);
    } else {
      setError("Please drop a valid PDF file");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      toast.info("Text Copied To Clipboard! 🎉");
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast.error("Unable to Copy Text to Clipboard!");
    }
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName.replace(".pdf", "")}_extracted_text.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-30 p-5 text-primary">
      <ToastContainer />
      <div className="max-w-3xl space-y-10 mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 hover:scale-105 rounded-full mb-4">
            <FileText className="w-8 h-8 text-gray-100" />
          </div>
          <h1 className="text-4xl font-bold mb-2">AI MCQ's Generator</h1>
          <p className="text-lg text-muted">
            Upload a PDF file and extract all its text content and generate MCQ
            Question with AI
          </p>
        </div>

        <div className="inline-flex flex-col gap bg-light p-8 w-full border border-border rounded-xl">
          <div className="w-full mb-5">
            <h3 className="font-semibold mb-2">Upload PDF Document</h3>
            <div className="bg-base flex flex-col items-center gap-5 p-5 border-3 border-blue-500 border-dashed rounded-lg ">
              <Upload className="w-15 h-15" />
              <p>Drag & Drop One</p>
              <input type="file" accept=".pdf" onChange={handleFileUpload} onDragOver={handleDragOver} onDrop={handleDrop} className="hidden" id="pdf" />
              <label htmlFor="pdf" className="bg-blue-600 py-3 px-5 rounded-md text-white">Choose a PDF File</label>
            </div>
          </div>

          <div className="my-6 p-3 bg-brand/10 border border-text/70 rounded-lg">
            <p className="text-xs sm:text-sm text-primary">
              <strong>Note:</strong> Selecting Multiple Options will generate a mix from the options selected.
            </p>
          </div>

          <div className="space-y-8">
            {selectData.map((data, i) => (
              <Select key={i} question={data.question} options={data.options} multiselect={data.multiselect} />
            ))}
          </div>

        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Extracting text from PDF...</p>
          </div>
        )}

        {/* Extracted Text Display */}
        {extractedText && !isLoading && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Extracted Text from: {fileName}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    <span className="text-nowrap">Copy Text</span>
                  </button>
                  <button
                    onClick={downloadText}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                  {extractedText}
                </pre>
              </div>

              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <div>
                  <p>Characters: {extractedText.length}</p>
                  <p>
                    Words:{" "}
                    {
                      extractedText
                        .split(/\s+/)
                        .filter((word) => word.length > 0).length
                    }
                  </p>
                </div>
                <button
                  onClick={() => navigate("/quiz", { state: { questions } })}
                  className="bg-blue-400 p-3 text-white font-semibold rounded-lg"
                >
                  Generate MCQ's
                </button>
              </div>
            </div>
          </>
        )}

        {/* Instructions */}
        {!extractedText && !isLoading && (
          <div className="bg-light border-1 border-border rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-primary mb-3">
              How to use:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm sm:text-lg text-primary">
              <li>
                Click "Choose PDF File" or drag and drop a PDF file into the
                upload area
              </li>
              <li>Wait for the text extraction process to complete</li>
              <li>Review the extracted text in the display area</li>
              <li>Copy the text to clipboard or download it as a text file</li>
            </ol>

            <div className="mt-6 p-3 bg-brand/10 border border-text/70 rounded-lg">
              <p className="text-xs sm:text-sm text-primary">
                <strong>Note:</strong> This tool works best with text-based
                PDFs. Scanned documents or image-based PDFs may not extract
                properly and would require OCR processing.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextExtractor;
