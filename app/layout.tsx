import "./globals.css"
import Navbar from './components/Navbar';
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <Analytics/>
        <main className="p-4 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
