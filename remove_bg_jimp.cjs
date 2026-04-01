const Jimp = require('jimp');

async function removeBackground(inputPath, outputPath) {
  try {
    const image = await Jimp.read(inputPath);
    console.log("Image loaded!");
    
    const bgHex = image.getPixelColor(0, 0);
    const { r: bgR, g: bgG, b: bgB } = Jimp.intToRGBA(bgHex);
    
    console.log(`Background color detected: RGB(${bgR}, ${bgG}, ${bgB})`);
    
    const tolerance = 40;

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      if (Math.abs(red - bgR) < tolerance &&
          Math.abs(green - bgG) < tolerance &&
          Math.abs(blue - bgB) < tolerance) {
        this.bitmap.data[idx + 3] = 0; 
      }
    });

    await image.writeAsync(outputPath);
    console.log('Background removed and saved to', outputPath);
  } catch (error) {
    console.error('Error:', error);
  }
}

removeBackground('public/careerai-icon.jpeg', 'public/careerai-icon.png');
