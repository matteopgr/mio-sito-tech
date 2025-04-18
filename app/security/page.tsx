'use client';

import { useState } from 'react';

type UtilityType = 'uuid' | 'hash-md5' | 'hash-sha256' | 'base64-encode' | 'base64-decode';

export default function UtilityConversionPage() {
  const [utility, setUtility] = useState<UtilityType>('uuid');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const requiresInput = utility !== 'uuid';

  const handleConvert = async () => {
    if (requiresInput && !inputText.trim()) {
      setMessage('❗ Inserisci del testo da convertire.');
      return;
    }

    setMessage('⚙️ Elaborazione in corso...');

    const res = await fetch('/api/convert/security', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ utility, input: inputText }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(`❌ Errore: ${data.error || 'Errore sconosciuto'}`);
      setResult(null);
    } else {
      setResult(data.result);
      setMessage('✅ Operazione completata.');
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-xl bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Utility Tools</h1>
        <p className="mb-6 text-gray-700 text-center">
          Genera UUID, calcola hash (MD5, SHA256), o converti testo in Base64.
        </p>

        {/* Select utility */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tipo di utility:</label>
          <select
            value={utility}
            onChange={(e) => {
              setUtility(e.target.value as UtilityType);
              setInputText('');
              setResult(null);
              setMessage(null);
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="uuid">Genera UUID</option>
            <option value="hash-md5">Calcola Hash MD5</option>
            <option value="hash-sha256">Calcola Hash SHA256</option>
            <option value="base64-encode">Testo → Base64</option>
            <option value="base64-decode">Base64 → Testo</option>
          </select>
        </div>

        {/* Text input if needed */}
        {requiresInput && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Testo di input:</label>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              placeholder="Inserisci il testo da convertire..."
            />
          </div>
        )}

        {/* Convert button */}
        <div className="flex justify-center">
          <button
            onClick={handleConvert}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Esegui
          </button>
        </div>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-gray-800">{message}</p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 p-4 bg-green-100 text-gray-800 rounded-md break-words text-center">
            <strong>Risultato:</strong> <br />
            <code>{result}</code>
          </div>
        )}
      </div>
    </div>
  );
}
