import fs from "fs";
import path from "path";

export const getFilesRecursively = async (dir: any): Promise<any> => {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = entries.map((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? getFilesRecursively(fullPath) : fullPath;
  });
  return Array.prototype.concat(...(await Promise.all(files)));
};
