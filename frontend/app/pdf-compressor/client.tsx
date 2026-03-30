"use client";

import { useState } from "react";
import Link from "next/link";

export default function PdfCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file!");
      return;
    }

    setLoading(true);
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/compress-pdf/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Compression failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      setDownloadUrl(url);
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          PDF Compressor
        </h1>
        <p className="text-center text-gray-500 mt-2 text-sm">
          Reduce PDF size instantly without losing quality
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
        <div className="mt-6 border-2 border-dashed border-blue-300 rounded-xl p-6 text-center bg-blue-50 hover:bg-blue-100 transition">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
            className="w-full text-sm text-gray-700"
          />

          {file && (
            <p className="mt-3 text-sm text-gray-700">
              📄 Selected:{" "}
              <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold transition
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              Compressing...
            </>
          ) : (
            "Compress PDF"
          )}
        </button>

        {/* Download */}
        {downloadUrl && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-medium mb-2">
              Compression Successful 🎉
            </p>

            <a
              href={downloadUrl}
              download="compressed.pdf"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
            >
              Download Compressed PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}