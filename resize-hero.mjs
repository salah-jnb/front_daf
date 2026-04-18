import sharp from 'sharp';

// Resize and compress hero image
await sharp('src/assets/hero-sea.webp')
  .resize(1920, 1080, { fit: 'cover' })
  .webp({ quality: 65 })
  .toFile('src/assets/hero-sea-optimized.webp');

const stats = await sharp('src/assets/hero-sea-optimized.webp').metadata();
console.log(`Done! New size: ${stats.width}x${stats.height}`);
