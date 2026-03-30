import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white/70 backdrop-blur-xl">

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              DocTools
            </h2>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Fast, secure, and free online document tools for everyday use.
              Convert, compress, and generate files instantly.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Tools
            </h3>

            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <Link href="/word-to-pdf" className="hover:text-black transition">Word to PDF</Link>
              <Link href="/pdf-to-word" className="hover:text-black transition">PDF to Word</Link>
              <Link href="/ppt-to-pdf" className="hover:text-black transition">PPT to PDF</Link>
              <Link href="/pdf-compressor" className="hover:text-black transition">Compress PDF</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-black transition">Home</Link>
              <Link href="#tools" className="hover:text-black transition">All Tools</Link>
              <Link href="/qr-generator" className="hover:text-black transition">QR Generator</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Contact
            </h3>

            <p className="text-sm text-gray-600">
              support@doctools.com Not Now
            </p>

            <p className="text-sm text-gray-600 mt-2">
              {/* Built with Next.js & FastAPI */}
              Enjoy Your Journey, We shall be in contact soon...
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} DocTools. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Thank You 💕 Visit Again
          </p>

          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="#" className="hover:text-black transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-black transition">Terms</Link>
            <Link href="#" className="hover:text-black transition">Support</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}