export default function AboutPage() {
    return (
      <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-3xl bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">About This Project</h1>
  
          <p className="text-gray-700 mb-4">
            This website was created to make file and data conversion simple, fast, and accessible for everyone. No complicated interfaces, just clean tools that work.
          </p>
  
          <p className="text-gray-700 mb-4">
            You can convert a wide range of formats including images (PNG, JPEG, WebP), programming formats (JSON, CSV, YAML), Base64 encoding, UUID generation, hashing (MD5, SHA256), and more.
          </p>
  
          <p className="text-gray-700 mb-4">
            All conversions happen securely—files are processed temporarily and not stored on the server. This keeps your data private and safe.
          </p>
  
          <p className="text-gray-700 mb-4">
            Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and open-source libraries.
          </p>
  
          <p className="text-sm text-gray-500 text-center mt-6">
            Got feedback or want to contribute? Head over to the <a href="/contact" className="text-blue-600 hover:underline">Contact</a> page.
          </p>
        </div>
      </div>
    );
  }
  