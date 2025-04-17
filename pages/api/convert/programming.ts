import fs from 'fs';
import path from 'path';
import os from 'os';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import Papa from 'papaparse';
import yaml from 'js-yaml';

// Disattiva il bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const form = formidable({
    uploadDir: os.tmpdir(),
    keepExtensions: true,
  });

  const data = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  const from = Array.isArray(data.fields.from) ? data.fields.from[0] : data.fields.from;
  const to = Array.isArray(data.fields.to) ? data.fields.to[0] : data.fields.to;
  const file = Array.isArray(data.files.file) ? data.files.file[0] : data.files.file;
  const inputPath = file.filepath;
  const inputName = path.basename(file.originalFilename || 'file');

  try {
    const content = fs.readFileSync(inputPath, 'utf-8');
    let converted = '';
    let filename = 'converted';

    // JSON ↔ CSV
    if ((from === 'json' && to === 'csv') || (from === 'csv' && to === 'json')) {
      if (from === 'json') {
        const json = JSON.parse(content);
        converted = Papa.unparse(json);
        filename = 'converted.csv';
        res.setHeader('Content-Type', 'text/csv');
      } else {
        const parsed = Papa.parse(content, { header: true });
        converted = JSON.stringify(parsed.data, null, 2);
        filename = 'converted.json';
        res.setHeader('Content-Type', 'application/json');
      }
    }

    // YAML ↔ JSON
    else if ((from === 'yaml' && to === 'json') || (from === 'json' && to === 'yaml')) {
      if (from === 'yaml') {
        const json = yaml.load(content);
        converted = JSON.stringify(json, null, 2);
        filename = 'converted.json';
        res.setHeader('Content-Type', 'application/json');
      } else {
        const json = JSON.parse(content);
        converted = yaml.dump(json);
        filename = 'converted.yaml';
        res.setHeader('Content-Type', 'text/yaml');
      }
    }

    // Base64 ↔ Testo
    else if ((from === 'base64' && to === 'text') || (from === 'text' && to === 'base64')) {
      if (from === 'base64') {
        converted = Buffer.from(content, 'base64').toString('utf-8');
        filename = 'converted.txt';
        res.setHeader('Content-Type', 'text/plain');
      } else {
        converted = Buffer.from(content).toString('base64');
        filename = 'converted.b64.txt';
        res.setHeader('Content-Type', 'text/plain');
      }
    }

    else {
      return res.status(400).json({ error: 'Conversione non supportata' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.status(200).send(converted);

  } catch (err) {
    console.error('Errore durante la conversione:', err);
    res.status(500).json({ error: 'Errore durante la conversione' });
  }
}
