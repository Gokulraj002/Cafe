import { ImageResponse } from 'next/og';
import monogramArt from '@/components/mobile/monogram';

const ICONS = [
  { id: 'favicon', size: { width: 32, height: 32 }, contentType: 'image/png' },
  { id: 'app-192', size: { width: 192, height: 192 }, contentType: 'image/png' },
  { id: 'app-512', size: { width: 512, height: 512 }, contentType: 'image/png' },
];

/** Browser-tab favicon plus the two sizes the web app manifest asks for. */
export function generateImageMetadata() {
  return ICONS;
}

export default async function Icon({ id }) {
  const iconId = await id;
  const { size } = ICONS.find((icon) => icon.id === iconId) ?? ICONS[0];

  return new ImageResponse(monogramArt(size.width, { rounded: iconId === 'favicon' }), size);
}
