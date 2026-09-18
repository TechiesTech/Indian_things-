import { Jimp } from "jimp";

async function main() {
  try {
    const image = await Jimp.read('public/images/IndianThingsLogo.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    // Based on the screenshot, the logo is roughly in the center 60-70% of the image.
    // Let's crop it to 65% of the original size from the center.
    const cropSize = Math.floor(Math.min(width, height) * 0.65);
    const x = Math.floor((width - cropSize) / 2);
    const y = Math.floor((height - cropSize) / 2);
    
    image.crop({ x, y, w: cropSize, h: cropSize });
    
    // Save as favicon.png
    await image.write('public/favicon.png');
    console.log("Successfully created favicon.png!");
  } catch (err) {
    console.error("Error cropping image:", err);
  }
}

main();
