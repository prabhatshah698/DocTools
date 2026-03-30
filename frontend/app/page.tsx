"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const tools = [
    { name: "Word to PDF", link: "/word-to-pdf", icon: "/icons/word-to-pdf.png" },
    { name: "PDF to Word", link: "/pdf-to-word", icon: "/icons/pdf-to-word.png" },
    { name: "PPT to PDF", link: "/ppt-to-pdf", icon: "/icons/ppt-to-pdf.png" },
    { name: "PDF to PPT", link: "/pdf-to-ppt", icon: "/icons/pdf-to-ppt.png" },
    { name: "Word to PPT", link: "/word-to-ppt", icon: "/icons/word-to-ppt.png" },
    { name: "PPT to Word", link: "/ppt-to-word", icon: "/icons/ppt-to-word.png" },
    { name: "QR Code Generator", link: "/qr-generator", icon: "/icons/qr-code.png" },
    { name: "Compress PDF", link: "/pdf-compressor", icon: "/icons/pdf-compressed.png" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-6 py-10">

      {/* HEADER */}
      <div className="relative text-center mb-14">

        {/* Glow */}
        <div className="absolute inset-0 flex justify-center -z-10">
          <div className="w-72 h-72 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 blur-3xl opacity-40 rounded-full"></div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 border border-gray-200 shadow-sm backdrop-blur-md text-xs text-gray-600 font-medium">
          ⚡ Fast • Secure • Free Tools
        </div>

        {/* ✅ H1 */}
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-gray-900">
          Free Online Document Tools
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Convert, compress, and generate documents instantly with modern,
          lightweight and secure online tools. No signup required.
        </p>

        {/* CTA */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="#tools"
            className="px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black transition"
          >
            Explore Tools
          </a>

          <a
            href="/qr-generator"
            className="px-5 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            Try QR Generator
          </a>
        </div>
      </div>

      {/* ✅ H2 SECTION */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          All-in-One PDF & Document Tools
        </h2>
        <p className="text-gray-600 mt-2">
          Convert documents, compress PDFs, and generate QR codes using our free online tools.
        </p>
      </div>

      {/* GRID */}
      <div id="tools" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">

        {tools.map((tool, index) => (
          <Link key={index} href={tool.link}>

            <div className="group bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">

              {/* ICON */}
              <Image
                src={tool.icon}
                alt={`${tool.name} tool icon`}
                width={85}
                height={85}
                className="mx-auto object-contain group-hover:scale-110 transition duration-300"
              />

              {/* ✅ H3 */}
              <h3 className="text-sm font-semibold text-gray-900 mt-4">
                {tool.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Fast • Secure • Free
              </p>

              <div className="mt-4">
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition">
                  Open Tool →
                </span>
              </div>

            </div>

          </Link>
        ))}

      </div>

      {/* ✅ SEO CONTENT BLOCK */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Free Online PDF & Document Tools
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Our platform provides powerful tools to convert Word to PDF, PDF to Word,
          compress PDF files, and generate QR codes. All tools are free, secure,
          and easy to use with no signup required.
        </p>
      </div>

      {/* ✅ FAQ SECTION (VISIBLE UI) */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-sm text-gray-700">
          <p><strong>Is this tool free?</strong><br />Yes, all tools are completely free.</p>
          <p><strong>Is my data secure?</strong><br />Yes, files are processed securely and not stored.</p>
          <p><strong>Can I convert PDF to Word?</strong><br />Yes, easily with our free tool.</p>
        </div>
      </div>

      {/* ✅ FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this document tool free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, all tools are completely free.",
                },
              },
              {
                "@type": "Question",
                name: "Is my data secure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, files are processed securely and not stored.",
                },
              },
              {
                "@type": "Question",
                name: "Can I convert PDF to Word?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, easily with our free tool.",
                },
              },
            ],
          }),
        }}
      />

      {/* ✅ SOFTWARE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Document Tools Hub",
            applicationCategory: "UtilityApplication",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Free online tools to convert, compress and manage documents including PDF, Word, PPT and QR code generation.",
          }),
        }}
      />

    </div>
  );
}