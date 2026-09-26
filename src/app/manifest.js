import cafe from '@/data/cafe';

/** Web app manifest — lets phones install the site and open it full-screen. */
export default function manifest() {
  return {
    name: cafe.name,
    short_name: cafe.shortName,
    description: cafe.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#241a16',
    theme_color: '#241a16',
    icons: [
      { src: '/icon/app-192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon/app-512', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon/app-512', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
