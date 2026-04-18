import sharp from 'sharp';

await sharp('src/assets/hero-sea.webp')
  .resize(1920, 1080, { fit: 'cover' })
  .webp({ quality: 40 })
  .toFile('src/assets/hero-sea-small.webp');

const stats = await sharp('src/assets/hero-sea-small.webp').metadata();
console.log(`Done! New size: ${stats.width}x${stats.height}`);
