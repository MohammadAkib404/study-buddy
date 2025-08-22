import React, { useState } from 'react';
import { Upload, FileText, Download, Copy, AlertCircle } from 'lucide-react';
import getMCQ from '../API_Connection';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const TextExtractor = () => {

  const navigate = useNavigate();

  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState(null);

  const generateMCQ = async (text) => {
    const res = await getMCQ(text);
    console.log(res);
    const mcq = JSON.parse(res);
    console.log(mcq);
    setQuestions(mcq);
  }

  const extractTextFromPDF = async (file) => {
    try {
      setIsLoading(true);
      setError('');

      // Load PDF.js from CDN
      if (!window.pdfjsLib) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        document.head.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });

        // Set worker path
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;

      let fullText = '';

      // Extract text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
      }

      setExtractedText(fullText);
      setFileName(file.name);
      setIsLoading(false);
      toast.success('Text Extracted from PDF');
      window.scrollTo({ top: 800, behavior: 'smooth' })

      const id = toast.loading("Uploading file...");

      await generateMCQ(fullText);

      toast.update(id, {
        render: "Upload complete ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });

    } catch (err) {
      setError(`Error extracting text: ${err.message}`);
      console.error('PDF extraction error:', err);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      extractTextFromPDF(file);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      extractTextFromPDF(file);
    } else {
      setError('Please drop a valid PDF file');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      toast.info("Text Copied To Clipboard! 🎉")
    } catch (err) {
      console.error('Failed to copy text:', err);
      toast.error("Unable to Copy Text to Clipboard!")
    }
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.replace('.pdf', '')}_extracted_text.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen text-neutral p-6">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">PDF Text Extractor</h1>
          <p className="text-lg text-tertiary">Upload a PDF file and extract all its text content</p>
        </div>

        {/* Upload Area */}
        <div className="bg-highlight rounded-xl border-1 border-border p-8 mb-6">
          <div
            className="border-2 border-dashed border-blue-400 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <div className="mb-4">
              <p className="text-lg font-semibold text-neutral mb-2">
                Drop your PDF file here or click to browse
              </p>
              <p className="text-sm text-tertiary">Supports PDF files up to 50MB</p>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="pdf-upload"
            />
            <label
              htmlFor="pdf-upload"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose PDF File
            </label>
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
                    <span className='text-nowrap'>Copy Text</span>
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
                  <p>Words: {extractedText.split(/\s+/).filter(word => word.length > 0).length}</p>
                </div>
                <button onClick={() => navigate('/quiz', { state: { questions } })} className='bg-blue-400 p-3 text-white font-semibold rounded-lg'>Generate MCQ's</button>
              </div>
            </div>
          </>
        )}

        {/* Instructions */}
        {!extractedText && !isLoading && (
          <div className="bg-highlight border-1 border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-3">How to use:</h3>
            <ol className="list-decimal list-inside space-y-2 text-text">
              <li>Click "Choose PDF File" or drag and drop a PDF file into the upload area</li>
              <li>Wait for the text extraction process to complete</li>
              <li>Review the extracted text in the display area</li>
              <li>Copy the text to clipboard or download it as a text file</li>
            </ol>

            <div className="mt-6 p-4 bg-tertiary/10 border border-text/70 rounded-lg">
              <p className="text-sm text-text">
                <strong>Note:</strong> This tool works best with text-based PDFs. Scanned documents or image-based PDFs may not extract properly and would require OCR processing.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextExtractor; 