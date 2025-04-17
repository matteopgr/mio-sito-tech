import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import os from 'os';
import sharp from 'sharp';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Supported image formats
const validFormats = ['jpeg', 'jpg', 'png', 'webp', 'gif'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const uploadDir = os.tmpdir();
  const form = new IncomingForm({ uploadDir, keepExtensions: true });

  const data = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  // Access first elements from possible arrays
  const from = Array.isArray(data.fields.from) ? data.fields.from[0] : data.fields.from;
  const to = Array.isArray(data.fields.to) ? data.fields.to[0] : data.fields.to;
  const file = Array.isArray(data.files.file) ? data.files.file[0] : data.files.file;

  if (!data.files?.file || !from || !to) {
    return res.status(400).json({ error: 'Missing parameters: file, from, or to' });
  }

  const targetFormat = to.toLowerCase();

  // Check if the target format is supported
  if (!validFormats.includes(targetFormat)) {
    return res.status(400).json({ error: 'Invalid target format' });
  }

  // Check uploaded file extension matches the selected 'from' format
  const uploadedExt = path.extname(file.originalFilename || '').replace('.', '').toLowerCase();
  const expectedExt = from.toLowerCase();

  if (uploadedExt !== expectedExt) {
    return res.status(400).json({
      error: `The uploaded file has extension .${uploadedExt}, but you selected .${expectedExt} as source format.`,
    });
  }

  const inputPath = data.files.file[0].filepath;
  const inputFilename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(uploadDir, `${inputFilename}.${targetFormat}`);

  try {
    const buffer = fs.readFileSync(inputPath);

    // Special handling for SVG input: rasterize to PNG first
    if (from.toLowerCase() === 'svg' && targetFormat !== 'svg') {
      const convertedBuffer = await sharp(buffer)
        .toFormat('png') // Rasterize SVG to PNG
        .toBuffer();

      const finalBuffer = await sharp(convertedBuffer)
        .toFormat(targetFormat as sharp.AvailableFormatInfo)
        .toBuffer();

      res.setHeader('Content-Type', `image/${targetFormat}`);
      res.setHeader('Content-Disposition', `attachment; filename="${inputFilename}.${targetFormat}"`);
      return res.send(finalBuffer);
    } else {
      // Convert directly if not SVG
      const convertedBuffer = await sharp(buffer)
        .toFormat(targetFormat as sharp.AvailableFormatInfo)
        .toBuffer();

      res.setHeader('Content-Type', `image/${targetFormat}`);
      res.setHeader('Content-Disposition', `attachment; filename="${inputFilename}.${targetFormat}"`);
      return res.send(convertedBuffer);
    }
  } catch (error) {
    console.error('Image conversion error:', error);
    return res.status(500).json({ error: 'An error occurred during image conversion' });
  }
}
