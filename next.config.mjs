/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local photography in /public/images is optimised by Next.js (AVIF/WebP).
    // Film stills bypass this: VideoStill passes Cloudinary's own loader.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 768, 1080, 1440, 1920, 2400],
    imageSizes: [160, 320],
  },
};

export default nextConfig;
