// app/api/convert/docx-to-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';
import { tmpdir } from 'os';
import { v4 as uuidv4 } from 'uuid';
import convert from 'libreoffice-convert';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const form = new IncomingForm({ uploadDir: tmpdir(), keepExtensions: true });

  const data = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
    form.parse(req.body as any, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  const uploadedFile = data.files.file[0]; // accesso al file
  const filePath = uploadedFile.filepath;
  const fileData = await fs.readFile(filePath);

  const pdfBuf = await new Promise<Buffer>((resolve, reject) => {
    convert.convert(fileData, '.pdf', undefined, (err, done) => {
      if (err) reject(err);
      else resolve(done);
    });
  });

  const filename = `converted-${uuidv4()}.pdf`;

  return new NextResponse(pdfBuf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
