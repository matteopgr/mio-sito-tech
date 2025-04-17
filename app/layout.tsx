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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <Analytics />
        
        <div className="flex p-4">
          {/* Left Ad */}
          <aside className="hidden lg:block w-1/6 pr-4">
            <ins className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-8842264397711661"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <script dangerouslySetInnerHTML={{
              __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
            }} />
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>

          {/* Right Ad */}
          <aside className="hidden lg:block w-1/6 pl-4">
            <ins className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-8842264397711661"
              data-ad-slot="0987654321"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <script dangerouslySetInnerHTML={{
              __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
            }} />
          </aside>
        </div>
      </body>
    </html>
  );
}
