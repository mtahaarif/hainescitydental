import mysql from 'mysql2/promise';

const {
  HOSTGATOR_DB_HOST,
  HOSTGATOR_DB_USER,
  HOSTGATOR_DB_PASSWORD,
  HOSTGATOR_DB_NAME,
  HOSTGATOR_DB_PORT,
} = process.env;

if (!HOSTGATOR_DB_HOST || !HOSTGATOR_DB_USER || !HOSTGATOR_DB_NAME) {
  // don't throw here so local dev without HostGator is still possible
  console.warn('HostGator DB environment variables are not fully set.');
}

const pool = mysql.createPool({
  host: HOSTGATOR_DB_HOST,
  user: HOSTGATOR_DB_USER,
  password: HOSTGATOR_DB_PASSWORD,
  database: HOSTGATOR_DB_NAME,
  port: HOSTGATOR_DB_PORT ? Number(HOSTGATOR_DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true,
});

export async function query(sql: string, params?: any) {
  const [rows] = await pool.query(sql, params as any);
  return rows as any;
}

export { pool };
