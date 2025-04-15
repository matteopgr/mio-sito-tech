import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import os from 'os';
import sharp from 'sharp';
import type { NextApiRequest, NextApiResponse } from 'next';

// Disabilita il bodyParser di Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

// Formati di immagine supportati
const validFormats = ['jpeg', 'jpg', 'png', 'webp', 'gif'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const uploadDir = os.tmpdir();

  const form = new IncomingForm({ uploadDir, keepExtensions: true });

  const data = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  // Log dei dati ricevuti
  console.log('Dati ricevuti:', data);

  // Accedi ai primi elementi degli array
  const from = Array.isArray(data.fields.from) ? data.fields.from[0] : data.fields.from;
  const to = Array.isArray(data.fields.to) ? data.fields.to[0] : data.fields.to;

  // Log per verificare il contenuto dei parametri 'from' e 'to'
  console.log('Formato di partenza (from):', from);
  console.log('Formato di destinazione (to):', to);

  if (!data.files?.file || !from || !to) {
    return res.status(400).json({ error: 'Parametri mancanti' });
  }

  // Converte `to` in minuscolo per evitare problemi di case-sensitivity
  const targetFormat = to.toLowerCase();

  // Verifica se il formato di destinazione è valido
  if (!validFormats.includes(targetFormat)) {
    return res.status(400).json({ error: 'Formato di destinazione non valido' });
  }

  const inputPath = data.files.file[0].filepath;
  const inputFilename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(uploadDir, `${inputFilename}.${targetFormat}`);

  try {
    const buffer = fs.readFileSync(inputPath);

    // Gestione separata per SVG: lo convertiamo in PNG (formato raster)
    if (from.toLowerCase() === 'svg' && targetFormat !== 'svg') {
      const convertedBuffer = await sharp(buffer)
        .toFormat('png')  // Rasterizza l'SVG in PNG
        .toBuffer();

      // Poi, procediamo con la conversione verso il formato finale
      const finalBuffer = await sharp(convertedBuffer)
        .toFormat(targetFormat as unknown as sharp.AvailableFormatInfo)
        .toBuffer();

      res.setHeader('Content-Type', `image/${targetFormat}`);
      res.setHeader('Content-Disposition', `attachment; filename="${inputFilename}.${targetFormat}"`);
      res.send(finalBuffer);
    } else {
      // Converte l'immagine nel formato desiderato se non è SVG
      const convertedBuffer = await sharp(buffer)
        .toFormat(targetFormat as unknown as sharp.AvailableFormatInfo) // cast esplicito
        .toBuffer();

      res.setHeader('Content-Type', `image/${targetFormat}`);
      res.setHeader('Content-Disposition', `attachment; filename="${inputFilename}.${targetFormat}"`);
      res.send(convertedBuffer);
    }
  } catch (error) {
    console.error('Errore nella conversione immagine:', error);
    res.status(500).json({ error: 'Errore durante la conversione dell\'immagine' });
  }
}
