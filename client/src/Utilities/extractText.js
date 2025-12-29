import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";
import mammoth from "mammoth";
import { toast } from "react-toastify";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export default async function extractText(file, type) {
  try {
    if (type === "PDF") return extractFromPDF(file);
    else if (type === "DOCX") return extractFromDocx(file);
    else if (type === "TXT") return extractFromTxt(file);
  } catch (error) {
    toast.error("Unsupported File Type!");
    toast.error(error.message);
  }
}

const countWords = (text) =>
  text.trim().split(/\s+/).length;


const extractFromPDF = async (file) => {
  const MAX_WORDS = 10000; // 10k
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str).join(" ");
    if(countWords(fullText) > MAX_WORDS){
      break;
    }
    fullText += text + "\n";
  }

  return fullText;
};

const extractFromDocx = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

const extractFromTxt = async (file) => {
  return file.text();
};
