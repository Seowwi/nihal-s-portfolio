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
