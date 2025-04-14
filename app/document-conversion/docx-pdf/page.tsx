'use client';

import { useState } from 'react';

export default function DocxToPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setMessage("❗ Seleziona un file .docx prima di convertire.");
      return;
    }
  
    setMessage("⚙️ Conversione in corso...");
  
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const response = await fetch("/api/convert/docx-to-pdf", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Errore nella conversione");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      // Scarica automaticamente il file
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
  
      setMessage("✅ Conversione completata!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Errore durante la conversione.");
    }
  };
  

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-xl bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Converti .docx in .pdf</h1>
        <p className="mb-6 text-gray-700 text-center">
          Carica un file <strong>.docx</strong> per convertirlo in formato PDF.
        </p>

        {/* Bottone di caricamento file */}
        <div className="mb-4 flex justify-center">
          <label className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Seleziona file .docx
            <input
              type="file"
              accept=".docx"
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
            Converti in PDF
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
