"use client";

import { useState } from "react";

export default function PdfToPpt() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/pdf-to-ppt/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Conversion failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold text-center">
          PDF to PPT Converter
        </h1>

        {/* ✅ Fixed Input */}
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            if (!e.target.files?.length) return;
            setFile(e.target.files[0]);
          }}
          className="w-full text-sm text-gray-700 border p-2 rounded"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Converting..." : "Upload & Convert"}
        </button>

        {/* Download Button */}
        {downloadUrl && (
          <a
            href={downloadUrl}
            download="converted.pptx"
            className="block text-center bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Download PPT
          </a>
        )}
      </div>
    </div>
  );
}