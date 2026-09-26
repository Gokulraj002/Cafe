import { ImageResponse } from 'next/og';
import monogramArt from '@/components/mobile/monogram';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon for iOS — square; iOS rounds the corners itself. */
export default function AppleIcon() {
  return new ImageResponse(monogramArt(size.width), size);
}
