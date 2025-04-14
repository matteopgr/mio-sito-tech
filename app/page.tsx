import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faImage } from '@fortawesome/free-regular-svg-icons';
import Link from "next/link";
import { faComputer, faLock, faMicrochip } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Benvenuto su Tech Converter</h1>
      <p className="text-xl text-center mb-12">Un sito per convertire vari formati di file in base alle tue esigenze.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Categoria Documenti */}
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-700">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faFile} className="w-6 h-6 mr-4" />
            <h2 className="text-2xl font-bold">Documenti</h2>
          </div>
          <ul>
            <li>
              <Link href="/document-conversion/docx-pdf" className="text-blue-600 hover:underline">
                .docx ↔ .pdf
              </Link>
            </li>
            <li>
              <Link href="/document-conversion/txt-md" className="text-blue-600 hover:underline">
                .txt ↔ .md
              </Link>
            </li>
            <li>
              <Link href="/document-conversion/html-pdf" className="text-blue-600 hover:underline">
                .html ↔ .pdf
              </Link>
            </li>
          </ul>
        </div>

        {/* Categoria Immagini */}
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-700">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faImage} className="w-6 h-6 mr-4" />
            <h2 className="text-2xl font-bold">Immagini</h2>
          </div>
          <ul>
            <li>
              <Link href="/image-conversion/png-jpg" className="text-blue-600 hover:underline">
                .png ↔ .jpg
              </Link>
            </li>
            <li>
              <Link href="/image-conversion/webp-png" className="text-blue-600 hover:underline">
                .webp ↔ .png
              </Link>
            </li>
            <li>
              <Link href="/image-conversion/svg-png" className="text-blue-600 hover:underline">
                .svg ↔ .png
              </Link>
            </li>
          </ul>
        </div>

        {/* Categoria Programmazione */}
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-700">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faComputer} className="w-6 h-6 mr-4" />
            <h2 className="text-2xl font-bold">Programmazione</h2>
          </div>
          <ul>
            <li>
              <Link href="/programming/json-csv" className="text-blue-600 hover:underline">
                JSON ↔ CSV
              </Link>
            </li>
            <li>
              <Link href="/programming/yaml-json" className="text-blue-600 hover:underline">
                YAML ↔ JSON
              </Link>
            </li>
            <li>
              <Link href="/programming/base64-text" className="text-blue-600 hover:underline">
                Base64 ↔ testo
              </Link>
            </li>
          </ul>
        </div>

        {/* Categoria Sicurezza */}
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-700">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faLock} className="w-6 h-6 mr-4" />
            <h2 className="text-2xl font-bold">Sicurezza</h2>
          </div>
          <ul>
            <li>
              <Link href="/security/hash-calculation" className="text-blue-600 hover:underline">
                Calcolo hash (MD5, SHA256)
              </Link>
            </li>
            <li>
              <Link href="/security/text-base64" className="text-blue-600 hover:underline">
                Testo ↔ Base64
              </Link>
            </li>
            <li>
              <Link href="/security/generate-uuid" className="text-blue-600 hover:underline">
                Generazione UUID
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
