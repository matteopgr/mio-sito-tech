import "./globals.css";
import Navbar from './components/Navbar';
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <meta name="google-adsense-account" content="ca-pub-8842264397711661" />
        <meta name="google-site-verification" content="jP_O-pdub1JiA3vbEGax-zl_pG3eBlTJqU3zCmj4iqY" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8842264397711661"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <Analytics />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
      </body>
    </html>
  );
}
