/**
 * Uploads the master films in source-videos/ to Cloudinary under meaningful
 * public IDs (cafe/home/video-01 … 04).
 *
 * Runs on your machine only — the API secret never reaches the browser.
 *
 *   1. Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local
 *   2. npm run media:upload
 *   3. Copy the printed public IDs into src/data/videos.js
 */
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_DIR = path.resolve('source-videos');

// Which master becomes which film. Matched by a fragment of the filename.
const FILMS = [
  { publicId: 'cafe/home/video-01', match: 'Coffee_steaming' },
  { publicId: 'cafe/home/video-02', match: 'video_journey' },
  { publicId: 'cafe/home/video-03', match: 'building_itself' },
  { publicId: 'cafe/home/video-04', match: 'Barista_pouring' },
];

function loadCredentials() {
  try {
    process.loadEnvFile('.env.local');
  } catch {
    // Fall back to variables already present in the environment.
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env.local');
  }
  return { cloudName, apiKey, apiSecret };
}

// https://cloudinary.com/documentation/authentication_signatures
function sign(params, apiSecret) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return createHash('sha1').update(payload + apiSecret).digest('hex');
}

async function uploadFilm(filePath, publicId, { cloudName, apiKey, apiSecret }) {
  const params = { overwrite: 'true', public_id: publicId, timestamp: Math.round(Date.now() / 1000) };

  const form = new FormData();
  Object.entries(params).forEach(([key, value]) => form.append(key, String(value)));
  form.append('api_key', apiKey);
  form.append('signature', sign(params, apiSecret));
  form.append('file', new Blob([await readFile(filePath)], { type: 'video/mp4' }), path.basename(filePath));

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, { method: 'POST', body: form });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message ?? `Upload failed with ${response.status}`);
  return result;
}

async function main() {
  const credentials = loadCredentials();
  // Filenames may use a decomposed "é"; normalise before matching.
  const files = (await readdir(SOURCE_DIR)).map((name) => ({ name, normalised: name.normalize('NFC') }));

  for (const film of FILMS) {
    const file = files.find(({ normalised }) => normalised.includes(film.match));
    if (!file) {
      console.warn(`Skipped ${film.publicId}: no file matching "${film.match}" in source-videos/`);
      continue;
    }

    process.stdout.write(`Uploading ${file.name} → ${film.publicId} … `);
    const result = await uploadFilm(path.join(SOURCE_DIR, file.name), film.publicId, credentials);
    console.log(`done (${result.width}×${result.height}, ${result.duration}s)`);
  }

  console.log('\nUpdate the `id` fields in src/data/videos.js to the public IDs above.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
