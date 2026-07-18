import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: fileId } = await params;
    if (!fileId) {
      return new NextResponse('File ID is required', { status: 400 });
    }

    const sql = getSql();
    const result = await sql`
      SELECT mime_type, data_base64, name 
      FROM portfolio_files 
      WHERE id = ${fileId}
    `;

    if (result.length === 0) {
      return new NextResponse('File not found', { status: 404 });
    }

    const file = result[0];
    const buffer = Buffer.from(file.data_base64, 'base64');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': file.mime_type,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Disposition': `inline; filename="${file.name}"`,
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
