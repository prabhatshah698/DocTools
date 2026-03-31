export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://doc-tools-frontend.vercel.app/sitemap.xml",
  };
}