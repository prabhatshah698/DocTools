"use client";
import { useState } from "react";
import Link from "next/link";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    if (!text) return alert("Please enter text or URL!");

    setLoading(true);
    setQrImage("");

    const formData = new FormData();
    formData.append("data", text);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-qr/`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        setQrImage(url);
      } else {
        alert("QR generation failed!");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-300 px-4">

      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          QR Code Generator
        </h1>
        <p className="text-center text-gray-500 mt-2 text-sm">
          Create QR codes instantly from text or URLs
        </p>

        {/* Navigation */}
        <div className="text-center mt-3">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Go to Home
          </Link>
        </div>

        {/* Input Box */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Enter URL or text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={generateQR}
          disabled={loading}
          className={`mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold transition
          ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-gray-800 to-black hover:opacity-90"
            }`}
        >
          {loading ? (
            <>
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              Generating...
            </>
          ) : (
            "Generate QR Code"
          )}
        </button>

        {/* QR Result */}
        {qrImage && (
          <div className="mt-8 text-center">
            <p className="text-green-600 font-medium mb-4">
              QR Generated Successfully 🎉
            </p>

            <img
              src={qrImage}
              alt="QR Code"
              className="mx-auto w-48 h-48 border rounded-xl shadow-md"
            />

            <a
              href={qrImage}
              download="qrcode.png"
              className="mt-5 inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
            >
              Download QR Code
            </a>
          </div>
        )}

      </div>
    </div>
  );
}