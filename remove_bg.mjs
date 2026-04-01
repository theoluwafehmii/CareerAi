import fs from 'fs';
import { removeBackground } from '@imgly/background-removal-node';

async function main() {
  console.log("Starting background removal...");
  try {
    const inputPath = 'public/careerai-icon.jpeg';
    const outputPath = 'public/careerai-icon.png';
    const blob = await removeBackground(inputPath);
    let buffer;
    if (blob.arrayBuffer) {
        buffer = Buffer.from(await blob.arrayBuffer());
    } else {
        buffer = Buffer.from(await blob.stream().getReader().read().then(r => r.value));
    }
    fs.writeFileSync(outputPath, buffer);
    console.log("Background removed and saved to", outputPath);
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
