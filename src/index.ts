import sharp from "sharp";
import fs from "fs";
import path from "path";
import { getFilesRecursively } from "./models/files";

const inputDirectory = "./input";
const outputDirectory = "./output";
const sizes = [320, 480, 768, 1024, 1280, 1920, 2048, 3840];
const quality = 80;

const processImages = async () => {
  const files = await getFilesRecursively(inputDirectory);

  const imagePromises = files.map(async (file: string) => {
    const relativePath = path.relative(inputDirectory, file);
    const fileNameWithoutExt = path.basename(file, path.extname(file));
    const outputDir = path.join(outputDirectory, path.dirname(relativePath));
    const maxWidth = (await sharp(file).metadata()).width || 0;

    fs.mkdirSync(outputDir, { recursive: true });

    sizes.map(async (width) => {
      const outputFilePath = path.join(
        outputDir,
        `${fileNameWithoutExt}-${Math.min(width, maxWidth)}.webp`,
      );

      await sharp(file).resize(width).webp({ quality }).toFile(outputFilePath);
    });
  });

  await Promise.all(imagePromises);
  console.log("Image processing completed.");
};

processImages().catch((error) => {
  console.error("Error processing images:", error);
});
