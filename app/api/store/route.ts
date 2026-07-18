import { NextResponse } from 'next/server';
import { sql, initDb } from '@/lib/db';

// Ensure table exists on first run
let dbInitialized = false;

async function ensureDb() {
  if (!dbInitialized) {
    await initDb();
    dbInitialized = true;
  }
}

export async function GET() {
  try {
    await ensureDb();

    // Fetch custom content
    const contentResult = await sql`SELECT data FROM portfolio_store WHERE id = 'customContent'`;
    const customContent = contentResult.length > 0 ? contentResult[0].data : {};

    // Fetch hidden items
    const hiddenResult = await sql`SELECT data FROM portfolio_store WHERE id = 'hiddenItems'`;
    const hiddenItems = hiddenResult.length > 0 ? hiddenResult[0].data : {};

    return NextResponse.json({ customContent, hiddenItems });
  } catch (error) {
    console.error('Failed to fetch from DB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDb();
    const body = await request.json();

    if (body.customContent) {
      await sql`
        INSERT INTO portfolio_store (id, data)
        VALUES ('customContent', ${JSON.stringify(body.customContent)})
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data
      `;
    }

    if (body.hiddenItems) {
      await sql`
        INSERT INTO portfolio_store (id, data)
        VALUES ('hiddenItems', ${JSON.stringify(body.hiddenItems)})
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save to DB:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
