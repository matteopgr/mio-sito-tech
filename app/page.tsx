import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faImage } from '@fortawesome/free-regular-svg-icons';
import Link from "next/link";
import { faComputer, faLock } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import GoogleAd from './components/GoogleAd';

export default function HomePage() {
  return (
    <>
    <Head>
        <title>Tech Converter – Convert Files Instantly</title>
        <meta name="description" content="Convert your files instantly online – DOCX, PDF, JSON, CSV, images, and more. Free, fast, and no installation needed." />
        <meta name="keywords" content="file converter, convert pdf, convert docx, convert json, online file converter, pdf to docx, json to csv, tech converter" />
        <meta name="author" content="Tech Converter Team" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content="Tech Converter – Convert Files Instantly" />
        <meta property="og:description" content="Convert DOCX to PDF, JSON to CSV, and more formats online with ease." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://techconverter.vercel.app" />
        <meta property="og:image" content="https://techconverter.vercel.app/preview.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tech Converter – Convert Files Instantly" />
        <meta name="twitter:description" content="Free and fast online file converter for text, documents and images." />
        <meta name="twitter:image" content="https://techconverter.vercel.app/preview.png" />
      </Head>

    <main>
      <div className="min-h-screen bg-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Tech Converter</h1>
      <p className="text-xl text-center mb-12">A website to convert various file formats according to your needs</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Categoria Documenti */}
        <Link href="/document-conversion" className="bg-white p-6 rounded-lg shadow-lg shadow-gray-700 hover:bg-gray-50 transition">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faFile} className="w-6 h-6 mr-4" />
            <h2 className="text-2xl font-bold">Documents</h2>
          </div>
          <ul className="text-blue-600">
            <li>docx ↔ pdf</li>
            <li>txt ↔ md</li>
            <li>html ↔ pdf</li>
          </ul>
        </Link>

        {/* Categoria Immagini */}
        <Link href="/image-conversion" className="bg-white p-6 rounded-lg shadow-lg shadow-gray-700 hover:bg-gray-50 transition">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faImage} className="w-6 h-6 mr-4" />
            <h2 className="text-2xl font-bold">Images</h2>
          </div>
          <ul className="text-blue-600">
            <li>png ↔ jpg</li>
            <li>webp ↔ png</li>
            <li>svg ↔ png</li>
          </ul>
        </Link>

        {/* Categoria Programmazione */}
        <Link href="/programming" className="bg-white p-6 rounded-lg shadow-lg shadow-gray-700 hover:bg-gray-50 transition">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faComputer} className="w-6 h-6 mr-4" />
            <h2 className="text-2xl font-bold">Programming</h2>
          </div>
          <ul className="text-blue-600">
            <li>JSON ↔ CSV</li>
            <li>YAML ↔ JSON</li>
            <li>Base64 ↔ testo</li>
          </ul>
        </Link>

        {/* Categoria Sicurezza */}
        <Link href="/security" className="bg-white p-6 rounded-lg shadow-lg shadow-gray-700 hover:bg-gray-50 transition">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faLock} className="w-6 h-6 mr-4" />
            <h2 className="text-2xl font-bold">Security</h2>
          </div>
          <ul className="text-blue-600">
            <li>Calcolo hash (MD5, SHA256)</li>
            <li>Testo ↔ Base64</li>
            <li>Generazione UUID</li>
          </ul>
        </Link>
      </div>
      <GoogleAd/>
    </div>
    </main>
  </>
  );
}
