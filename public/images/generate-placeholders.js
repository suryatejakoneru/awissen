import fs from 'fs';
import { createCanvas } from 'canvas';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create images directory if it doesn't exist
if (!fs.existsSync('./public/images')) {
    fs.mkdirSync('./public/images', { recursive: true });
}

// Function to generate a placeholder image
function generatePlaceholder(width, height, text, filename) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Fill background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, width, height);

    // Add text
    ctx.fillStyle = '#6b7280';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    // Save the image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(join(__dirname, filename), buffer);
}

// Generate course images
for (let i = 1; i <= 3; i++) {
    generatePlaceholder(800, 450, `Course ${i}`, `course-${i}.jpg`);
}

// Generate testimonial images
for (let i = 1; i <= 3; i++) {
    generatePlaceholder(100, 100, `T${i}`, `testimonial-${i}.jpg`);
}

console.log('Placeholder images generated successfully!'); 