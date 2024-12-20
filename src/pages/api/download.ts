import { NextApiRequest, NextApiResponse } from "next";
import JSZip from "jszip";
import { promises as fs } from "fs";
import path from "path";

const excludedPaths = [
  "node_modules",
  ".next",
  ".git",
  ".env",
  ".env.local",
  "package-lock.json",
];

async function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): Promise<string[]> {
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    if (excludedPaths.some(excluded => file.includes(excluded))) {
      continue;
    }

    const filePath = path.join(dirPath, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      arrayOfFiles = await getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  }

  return arrayOfFiles;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const zip = new JSZip();
    const projectRoot = process.cwd();
    const files = await getAllFiles(projectRoot);

    for (const filePath of files) {
      const relativePath = path.relative(projectRoot, filePath);
      const fileContent = await fs.readFile(filePath);
      zip.file(relativePath, fileContent);
    }

    const zipContent = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      compressionOptions: { level: 9 },
    });

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=your-choice-tickets.zip");
    res.send(zipContent);
  } catch (error) {
    console.error("Error creating ZIP:", error);
    res.status(500).json({ message: "Error creating ZIP file" });
  }
}