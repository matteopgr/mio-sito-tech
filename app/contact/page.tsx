'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await emailjs.send(
        'service_9u5cq38',   // 🔁 sostituisci
        'template_yl9tqfp',  // 🔁 sostituisci
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        'QC_lIln4Iq6YP9Qxc'     // 🔁 sostituisci
      );

      console.log('Email inviata:', result.text);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Errore invio email:', err);
      setError('❌ C’è stato un problema con l’invio. Riprova più tardi.');
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-gray-700 mb-6 text-center">
          Have questions, feedback, or ideas for new tools? Drop us a message!
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 hover:cursor-pointer transition"
            >
              Send Message
            </button>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
          </form>
        ) : (
          <p className="text-center text-green-600 text-lg font-medium mt-6">
            ✅ Thank you! Your message has been sent.
          </p>
        )}
      </div>
    </div>
  );
}
