import sharp from 'sharp';

// Resize logo from 566x412 to 230x168 (2x for retina displays)
await sharp('src/assets/logo_jaf-566x412.webp')
  .resize(230, 168, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 80 })
  .toFile('src/assets/logo_jaf-small.webp');

const stats = await sharp('src/assets/logo_jaf-small.webp').metadata();
console.log(`Done! New size: ${stats.width}x${stats.height}`);
