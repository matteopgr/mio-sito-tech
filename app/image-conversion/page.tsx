'use client';

import { useState } from 'react';

const formats = ['png', 'jpg', 'webp', 'svg'];

export default function ImageConvertPage() {
  const [sourceFormat, setSourceFormat] = useState('png');
  const [targetFormat, setTargetFormat] = useState('jpg');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setMessage('❗ Seleziona un file da convertire.');
      return;
    }

    if (sourceFormat === targetFormat) {
      setMessage('⚠️ Il formato di partenza e di destinazione devono essere diversi.');
      return;
    }

    setMessage('⚙️ Conversione in corso...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('from', sourceFormat);
    formData.append('to', targetFormat);

    try {
      const res = await fetch('/api/convert/image', {
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
      link.download = `converted.${targetFormat}`;
      link.click();

      setMessage('✅ Conversione completata!');
    } catch (error) {
      console.error(error);
      setMessage('❌ Errore durante la conversione.');
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-xl bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Converti Immagine</h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Formato di partenza:</label>
          <select
            value={sourceFormat}
            onChange={(e) => setSourceFormat(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          >
            {formats.map((f) => (
              <option key={f} value={f}>{f.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Formato di destinazione:</label>
          <select
            value={targetFormat}
            onChange={(e) => setTargetFormat(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          >
            {formats.map((f) => (
              <option key={f} value={f}>{f.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition block text-center">
            Seleziona immagine
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {file && (
          <p className="text-sm text-center text-gray-600 mb-4">
            📁 File selezionato: <strong>{file.name}</strong>
          </p>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleConvert}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Converti
          </button>
        </div>

        {message && (
          <p className="mt-6 text-center text-gray-800">{message}</p>
        )}
      </div>
    </div>
  );
}
