export function Header() {
  return (
    <div className="relative text-center mb-14">

      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center -z-10">
        <div className="w-72 h-72 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 blur-3xl opacity-40 rounded-full"></div>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 border border-gray-200 shadow-sm backdrop-blur-md text-xs text-gray-600 font-medium">
        ⚡ Fast • Secure • Free Tools
      </div>

      {/* Title */}
      <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-gray-900">
        Document Tools Hub
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Convert, compress, and generate documents instantly with modern,
        lightweight and secure online tools. No signup required.
      </p>

      {/* CTA Buttons */}
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
  );
}