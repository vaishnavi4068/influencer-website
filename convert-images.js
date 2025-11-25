const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'Images');

// Images to convert
const imagesToConvert = [
    'instagram.jpg',
    'social.jpg',
    'fourth.jpg',
    'third.jpg',
    'manager.jpg'
];

async function convertToWebP() {
    console.log('Starting image conversion to WebP...\n');

    for (const image of imagesToConvert) {
        const inputPath = path.join(imagesDir, image);
        const outputPath = path.join(imagesDir, image.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

        if (!fs.existsSync(inputPath)) {
            console.log(`⚠️  ${image} not found, skipping...`);
            continue;
        }

        try {
            const inputStats = fs.statSync(inputPath);
            const inputSize = (inputStats.size / 1024 / 1024).toFixed(2);

            await sharp(inputPath)
                .webp({ quality: 85 })
                .toFile(outputPath);

            const outputStats = fs.statSync(outputPath);
            const outputSize = (outputStats.size / 1024 / 1024).toFixed(2);
            const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

            console.log(`✅ ${image}`);
            console.log(`   Before: ${inputSize} MB`);
            console.log(`   After:  ${outputSize} MB`);
            console.log(`   Saved:  ${savings}%\n`);
        } catch (error) {
            console.log(`❌ Error converting ${image}: ${error.message}\n`);
        }
    }

    console.log('Conversion complete!');
}

convertToWebP();
