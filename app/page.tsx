import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faImage } from '@fortawesome/free-regular-svg-icons';
import Link from "next/link";
import { faComputer, faLock } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Benvenuto su Tech Converter</h1>
      <p className="text-xl text-center mb-12">Un sito per convertire vari formati di file in base alle tue esigenze.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Categoria Documenti */}
        <Link href="/document-conversion" className="bg-white p-6 rounded-lg shadow-lg shadow-gray-700 hover:bg-gray-50 transition">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faFile} className="w-6 h-6 mr-4" />
            <h2 className="text-2xl font-bold">Documenti</h2>
          </div>
          <ul className="text-blue-600">
            <li>.docx ↔ .pdf</li>
            <li>.txt ↔ .md</li>
            <li>.html ↔ .pdf</li>
          </ul>
        </Link>

        {/* Categoria Immagini */}
        <Link href="/image-conversion" className="bg-white p-6 rounded-lg shadow-lg shadow-gray-700 hover:bg-gray-50 transition">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faImage} className="w-6 h-6 mr-4" />
            <h2 className="text-2xl font-bold">Immagini</h2>
          </div>
          <ul className="text-blue-600">
            <li>.png ↔ .jpg</li>
            <li>.webp ↔ .png</li>
            <li>.svg ↔ .png</li>
          </ul>
        </Link>

        {/* Categoria Programmazione */}
        <Link href="/programming/json-csv" className="bg-white p-6 rounded-lg shadow-lg shadow-gray-700 hover:bg-gray-50 transition">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faComputer} className="w-6 h-6 mr-4" />
            <h2 className="text-2xl font-bold">Programmazione</h2>
          </div>
          <ul className="text-blue-600">
            <li>JSON ↔ CSV</li>
            <li>YAML ↔ JSON</li>
            <li>Base64 ↔ testo</li>
          </ul>
        </Link>

        {/* Categoria Sicurezza */}
        <Link href="/security/hash-calculation" className="bg-white p-6 rounded-lg shadow-lg shadow-gray-700 hover:bg-gray-50 transition">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faLock} className="w-6 h-6 mr-4" />
            <h2 className="text-2xl font-bold">Sicurezza</h2>
          </div>
          <ul className="text-blue-600">
            <li>Calcolo hash (MD5, SHA256)</li>
            <li>Testo ↔ Base64</li>
            <li>Generazione UUID</li>
          </ul>
        </Link>
      </div>
    </div>
  );
}
