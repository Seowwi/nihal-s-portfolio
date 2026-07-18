import { NextResponse } from 'next/server';
import { getSql, initDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

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
    const sql = getSql();
    const contentResult = await sql`SELECT data FROM portfolio_store WHERE id = 'customContent'`;
    const customContent = contentResult.length > 0 ? contentResult[0].data : {};

    // Fetch hidden items
    const hiddenResult = await sql`SELECT data FROM portfolio_store WHERE id = 'hiddenItems'`;
    const hiddenItems = hiddenResult.length > 0 ? hiddenResult[0].data : {};

    // Fetch layout config
    const layoutResult = await sql`SELECT data FROM portfolio_store WHERE id = 'layoutConfig'`;
    const layoutConfig = layoutResult.length > 0 ? layoutResult[0].data : {};

    // Fetch added items count
    const addedResult = await sql`SELECT data FROM portfolio_store WHERE id = 'addedItemsCount'`;
    const addedItemsCount = addedResult.length > 0 ? addedResult[0].data : {};

    return NextResponse.json({ customContent, hiddenItems, layoutConfig, addedItemsCount });
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
      const sql = getSql();
      await sql`
        INSERT INTO portfolio_store (id, data)
        VALUES ('customContent', ${JSON.stringify(body.customContent)})
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data
      `;
    }

    if (body.hiddenItems) {
      const sql = getSql();
      await sql`
        INSERT INTO portfolio_store (id, data)
        VALUES ('hiddenItems', ${JSON.stringify(body.hiddenItems)})
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data
      `;
    }

    if (body.layoutConfig) {
      const sql = getSql();
      await sql`
        INSERT INTO portfolio_store (id, data)
        VALUES ('layoutConfig', ${JSON.stringify(body.layoutConfig)})
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data
      `;
    }

    if (body.addedItemsCount) {
      const sql = getSql();
      await sql`
        INSERT INTO portfolio_store (id, data)
        VALUES ('addedItemsCount', ${JSON.stringify(body.addedItemsCount)})
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save to DB:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
