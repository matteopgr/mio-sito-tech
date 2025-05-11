// components/GoogleAd.tsx
'use client';

import { useEffect } from 'react';

export default function GoogleAd() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({});
      } catch (e) {
        console.error('AdsbyGoogle error:', e);
      }
    }
  }, []);

  return (
    <aside className="hidden lg:block w-1/6 pr-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXX"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </aside>
  );
}
