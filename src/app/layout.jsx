import { Cormorant_Garamond, Manrope } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Maison Lente — Coffee, crafted slowly',
    template: '%s — Maison Lente',
  },
  description: 'A space for coffee, conversation and quiet moments. Four homepage concepts for Maison Lente.',
  applicationName: 'Maison Lente',
  // Added to the home screen it opens full-screen, like an app.
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Lente',
  },
  formatDetection: { telephone: false },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // Draw under the notch and home indicator; the navbar, tab bar and sheets
  // pad themselves with env(safe-area-inset-*).
  viewportFit: 'cover',
  themeColor: '#241a16',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <noscript>
          <style>{'.reveal-pending { visibility: visible !important; }'}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
