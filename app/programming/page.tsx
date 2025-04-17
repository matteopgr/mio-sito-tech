'use client';

import { useState, useEffect } from 'react';

const supportedConversions = {
  json: ['csv', 'yaml'],
  csv: ['json'],
  yaml: ['json'],
  text: ['base64'],
  base64: ['text'],
} as const;

type FormatType = keyof typeof supportedConversions;

export default function ProgrammingConversionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fromFormat, setFromFormat] = useState<FormatType>('json');
  const [toFormat, setToFormat] = useState<string>('csv');
  const [message, setMessage] = useState<string | null>(null);
  const [acceptTypes, setAcceptTypes] = useState('.json');

  useEffect(() => {
    setToFormat(supportedConversions[fromFormat][0]);
    const ext = fromFormat === 'text' || fromFormat === 'base64' ? '.txt' : `.${fromFormat}`;
    setAcceptTypes(ext);
  }, [fromFormat]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setMessage('❗ Please select a file to convert.');
      return;
    }

    if (fromFormat === toFormat) {
      setMessage('⚠️ The source and target formats must be different.');
      return;
    }

    setMessage('⚙️ Conversion in progress...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('from', fromFormat);
    formData.append('to', toFormat);

    try {
      const res = await fetch('/api/convert/programming', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error during conversion');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `converted.${toFormat}`;
      link.click();

      setMessage('✅ Conversion completed!');
    } catch (error) {
      console.error(error);
      setMessage('❌ Error during conversion.');
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-xl bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Programming Conversions</h1>
        <p className="mb-6 text-gray-700 text-center">
          Convert files between JSON, CSV, YAML, Base64, and Text formats.
        </p>

        {/* FROM Format */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Source Format:</label>
          <select
            value={fromFormat}
            onChange={(e) => setFromFormat(e.target.value as FormatType)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(supportedConversions).map((format) => (
              <option key={format} value={format}>
                {format.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* TO Format */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Target Format:</label>
          <select
            value={toFormat}
            onChange={(e) => setToFormat(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {supportedConversions[fromFormat].map((format) => (
              <option key={format} value={format}>
                {format.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* File input */}
        <div className="mb-4 flex justify-center">
          <label className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Select file
            <input
              type="file"
              accept={acceptTypes}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* File name */}
        {file && (
          <p className="text-sm text-center text-gray-600 mb-4">
            📄 Selected file: <strong>{file.name}</strong>
          </p>
        )}

        {/* Convert button */}
        <div className="flex justify-center">
          <button
            onClick={handleConvert}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition cursor-pointer"
          >
            Convert file
          </button>
        </div>

        {/* Message */}
        {message && (
          <p className="mt-6 text-center text-gray-800">{message}</p>
        )}
      </div>
    </div>
  );
}
