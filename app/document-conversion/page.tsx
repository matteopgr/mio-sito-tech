'use client';

import { useState, useEffect } from 'react';

const supportedFormats = ['docx', 'pdf', 'txt', 'md', 'html'];

// Lista di coppie supportate
const validPairs: [string, string][] = [
  ['docx', 'pdf'],
  ['txt', 'md'],
  ['html', 'pdf'],
];

// Costruzione della mappa bidirezionale
const buildConversionMap = () => {
  const map: Record<string, string[]> = {};

  validPairs.forEach(([from, to]) => {
    if (!map[from]) map[from] = [];
    if (!map[to]) map[to] = [];

    if (!map[from].includes(to)) map[from].push(to);
    if (!map[to].includes(from)) map[to].push(from); // viceversa
  });

  return map;
};

const conversionMap = buildConversionMap();

export default function FileConversionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fromFormat, setFromFormat] = useState<string>('docx');
  const [toFormat, setToFormat] = useState<string>('pdf');
  const [message, setMessage] = useState<string | null>(null);
  const [acceptTypes, setAcceptTypes] = useState<string>('.docx');

  useEffect(() => {
    setAcceptTypes(`.${fromFormat}`);
    const validTargets = conversionMap[fromFormat];
    if (!validTargets.includes(toFormat)) {
      setToFormat(validTargets[0]);
    }
  }, [fromFormat]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setMessage('❗ Seleziona un file prima di convertire.');
      return;
    }

    if (fromFormat === toFormat) {
      setMessage('⚠️ I formati di partenza e destinazione devono essere diversi.');
      return;
    }

    setMessage('⚙️ Conversione in corso...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('from', fromFormat);
    formData.append('to', toFormat);

    try {
      const res = await fetch('/api/convert/file', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Errore nella conversione');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `converted.${toFormat}`;
      link.click();

      setMessage('✅ Conversione completata!');
    } catch (error) {
      setMessage('❌ Errore durante la conversione.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-xl bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Converti file</h1>
        <p className="mb-6 text-gray-700 text-center">
          Carica un file per convertirlo in un altro formato.
        </p>

        {/* Selezione formato di input */}
        <div className="mb-4">
          <label htmlFor="fromFormat" className="block text-gray-700 mb-2">
            Formato di partenza:
          </label>
          <select
            id="fromFormat"
            value={fromFormat}
            onChange={(e) => setFromFormat(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(conversionMap).map((format) => (
              <option key={format} value={format}>
                .{format}
              </option>
            ))}
          </select>
        </div>

        {/* Selezione formato di output */}
        <div className="mb-4">
          <label htmlFor="toFormat" className="block text-gray-700 mb-2">
            Formato di destinazione:
          </label>
          <select
            id="toFormat"
            value={toFormat}
            onChange={(e) => setToFormat(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {conversionMap[fromFormat].map((format) => (
              <option key={format} value={format}>
                .{format}
              </option>
            ))}
          </select>
        </div>

        {/* Bottone di caricamento file */}
        <div className="mb-4 flex justify-center">
          <label className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Seleziona file
            <input
              type="file"
              accept={acceptTypes}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Nome del file selezionato */}
        {file && (
          <p className="text-sm text-center text-gray-600 mb-4">
            📄 File selezionato: <strong>{file.name}</strong>
          </p>
        )}

        {/* Bottone di conversione */}
        <div className="flex justify-center">
          <button
            onClick={handleConvert}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition cursor-pointer"
          >
            Converti file
          </button>
        </div>

        {/* Messaggio di stato */}
        {message && (
          <p className="mt-6 text-center text-gray-800">{message}</p>
        )}
      </div>
    </div>
  );
}
