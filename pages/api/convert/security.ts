import type { NextApiRequest, NextApiResponse } from 'next';
import { createHash, randomUUID } from 'crypto';

type ResponseData = { result: string } | { error: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { utility, input } = req.body;

  try {
    let result = '';

    switch (utility) {
      case 'uuid':
        result = randomUUID();
        break;
      case 'hash-md5':
        result = createHash('md5').update(input).digest('hex');
        break;
      case 'hash-sha256':
        result = createHash('sha256').update(input).digest('hex');
        break;
      case 'base64-encode':
        result = Buffer.from(input, 'utf-8').toString('base64');
        break;
      case 'base64-decode':
        result = Buffer.from(input, 'base64').toString('utf-8');
        break;
      default:
        return res.status(400).json({ error: 'Tipo di utility non supportato' });
    }

    res.status(200).json({ result });
  } catch (err) {
    console.error('Errore durante la conversione:', err);
    res.status(500).json({ error: 'Errore durante la conversione' });
  }
}
