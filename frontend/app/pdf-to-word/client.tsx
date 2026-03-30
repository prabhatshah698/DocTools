"use client";
import { useState } from "react";
import Link from "next/link";

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    if (!file) return alert("Please select a PDF file first!");

    setLoading(true);
    setProgress(0);
    setDownloadLink("");

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${process.env.NEXT_PUBLIC_API_URL}/pdf-to-word/`);
    xhr.responseType = "blob";

    // Upload progress (0–50%)
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 50);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        let simulated = 50;

        const interval = setInterval(() => {
          simulated += 5;
          setProgress(simulated);

          if (simulated >= 100) {
            clearInterval(interval);
            setLoading(false);
            setProgress(0);
          }
        }, 80);

        const blob = new Blob([xhr.response], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        const url = window.URL.createObjectURL(blob);
        setDownloadLink(url);
      } else {
        setLoading(false);
        setProgress(0);
        alert("Conversion failed!");
      }
    };

    xhr.onerror = () => {
      setLoading(false);
      setProgress(0);
      alert("Upload failed!");
    };

    xhr.send(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-lime-100 px-4">

      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          PDF → Word Converter
        </h1>
        <p className="text-center text-gray-500 mt-2 text-sm">
          Convert your PDF files into editable Word documents
        </p>

        {/* Navigation */}
        <div className="text-center mt-3">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Go to Home
          </Link>
        </div>

        {/* Upload Box */}
        <div className="mt-6 border-2 border-dashed border-green-300 rounded-xl p-6 text-center bg-green-50 hover:bg-green-100 transition">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (!e.target.files?.length) return;
              setFile(e.target.files[0]);
            }}
            className="w-full text-sm text-gray-700"
          />

          {file && (
            <p className="mt-3 text-sm text-gray-700">
              📄 Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>

        {/* Progress Bar */}
        {loading && (
          <div className="mt-5">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm mt-2 text-gray-600">
              Processing... {progress}%
            </p>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold transition
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-lime-600 hover:opacity-90"
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              Converting...
            </>
          ) : (
            "Convert to Word"
          )}
        </button>

        {/* Download */}
        {downloadLink && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-medium mb-2">
              Conversion Successful 🎉
            </p>
            <a
              href={downloadLink}
              download="converted.docx"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
            >
              Download Word File
            </a>
          </div>
        )}

      </div>
    </div>
  );
}