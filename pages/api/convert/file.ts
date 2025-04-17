import fs from 'fs';
import path from 'path';
import os from 'os';
import libre from 'libreoffice-convert';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const uploadDir = os.tmpdir();

  const form = formidable({
    uploadDir,
    keepExtensions: true,
  });

  try {
    const data = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const from = Array.isArray(data.fields.from) ? data.fields.from[0] : data.fields.from;
    const to = Array.isArray(data.fields.to) ? data.fields.to[0] : data.fields.to;

    const file = Array.isArray(data.files.file) ? data.files.file[0] : data.files.file;

    if (!file || !from || !to) {
      return res.status(400).json({ error: 'Missing data: file, from, or to' });
    }

    // Extract the actual extension of the uploaded file
    const uploadedExt = path.extname(file.originalFilename || '').replace('.', '').toLowerCase();
    const expectedExt = from.toLowerCase();

    // Check if extension matches selected format
    if (uploadedExt !== expectedExt) {
      return res.status(400).json({
        error: `The uploaded file has extension .${uploadedExt}, but you selected .${expectedExt} as source format.`,
      });
    }

    const inputPath = file.filepath;
    const inputFilename = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(uploadDir, `${inputFilename}.${to}`);

    const fileBuffer = fs.readFileSync(inputPath);

    // --- DOCX or HTML to PDF ---
    if ((from === 'docx' || from === 'html') && to === 'pdf') {
      libre.convert(fileBuffer, 'pdf', undefined, (err, converted) => {
        if (err) {
          console.error('LibreOffice error:', err);
          return res.status(500).json({ error: 'Error during conversion' });
        }

        fs.writeFileSync(outputPath, converted);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${inputFilename}.pdf"`);
        return res.send(converted);
      });
      return;
    }

    // --- TXT to MD ---
    if (from === 'txt' && to === 'md') {
      const content = fs.readFileSync(inputPath, 'utf-8');
      fs.writeFileSync(outputPath, content, 'utf-8');
      res.setHeader('Content-Type', 'text/markdown');
      res.setHeader('Content-Disposition', `attachment; filename="${inputFilename}.md"`);
      return res.send(content);
    }

    // --- MD to TXT ---
    if (from === 'md' && to === 'txt') {
      const content = fs.readFileSync(inputPath, 'utf-8');
      fs.writeFileSync(outputPath, content, 'utf-8');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', `attachment; filename="${inputFilename}.txt"`);
      return res.send(content);
    }

    return res.status(400).json({
      error: `Conversion from .${from} to .${to} is not supported.`,
    });

  } catch (error) {
    console.error('Conversion error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
