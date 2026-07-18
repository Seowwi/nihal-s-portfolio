import { neon } from '@neondatabase/serverless';

export const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
  }
  return neon(process.env.DATABASE_URL);
};

export async function initDb() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_store (
      id VARCHAR(50) PRIMARY KEY,
      data JSONB NOT NULL
    );
  `;
}

export async function getAllStoreData() {
  try {
    const sql = getSql();
    const results = await sql`SELECT id, data FROM portfolio_store`;
    const store: Record<string, any> = {};
    for (const row of results) {
      store[row.id] = row.data;
    }
    return store;
  } catch (e) {
    console.error('Failed to get store data:', e);
    return {};
  }
}
