import mysql from 'mysql2/promise';

const {
  HOSTGATOR_DB_HOST,
  HOSTGATOR_DB_USER,
  HOSTGATOR_DB_PASSWORD,
  HOSTGATOR_DB_NAME,
  HOSTGATOR_DB_PORT,
} = process.env;

const missing: string[] = [];
if (!HOSTGATOR_DB_HOST) missing.push('HOSTGATOR_DB_HOST');
if (!HOSTGATOR_DB_USER) missing.push('HOSTGATOR_DB_USER');
if (!HOSTGATOR_DB_PASSWORD) missing.push('HOSTGATOR_DB_PASSWORD');
if (!HOSTGATOR_DB_NAME) missing.push('HOSTGATOR_DB_NAME');

if (missing.length) {
  console.warn('[MySQL] Missing env vars:', missing.join(', '));
  console.warn('[MySQL] DB Connection will fail until these are set in .env.local');
} else {
  console.log('[MySQL] All env vars present. Creating connection pool to', HOSTGATOR_DB_HOST);
}

let pool: any = null;
let poolInitialized = false;


export async function query(sql: string, params?: any) {
  // Lazy initialize pool on first query
  if (!pool && !poolInitialized) {
    poolInitialized = true;
    if (!HOSTGATOR_DB_HOST || !HOSTGATOR_DB_USER || !HOSTGATOR_DB_PASSWORD || !HOSTGATOR_DB_NAME) {
      const err = new Error('Missing database credentials. Check .env.local');
      console.error('[MySQL Query] Initialization error:', err.message);
      throw err;
    }
    try {
      console.log('[MySQL] Initializing pool to host:', HOSTGATOR_DB_HOST);
      pool = mysql.createPool({
        host: HOSTGATOR_DB_HOST,
        user: HOSTGATOR_DB_USER,
        password: HOSTGATOR_DB_PASSWORD,
        database: HOSTGATOR_DB_NAME,
        port: HOSTGATOR_DB_PORT ? Number(HOSTGATOR_DB_PORT) : 3306,
        connectTimeout: 10000,
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0,
        namedPlaceholders: true,
      });
      console.log('[MySQL] Pool initialized successfully');
    } catch (initErr) {
      poolInitialized = false;
      pool = null;
      console.error('[MySQL] Failed to initialize pool:', initErr);
      throw initErr;
    }
  }
  if (!pool) {
    const err = new Error('MySQL pool still not initialized');
    console.error('[MySQL Query] Error:', err.message);
    throw err;
  }
  try {
    console.log('[MySQL Query] Executing:', sql.substring(0, 100) + (sql.length > 100 ? '...' : ''));
    const [rows] = await pool.query(sql, params as any);
    console.log('[MySQL Query] Success, rows:', rows?.length || 0);
    return rows as any;
  } catch (err) {
    console.error('[MySQL Query] Error:', err instanceof Error ? err.message : String(err));
    throw err;
  }
}

export { pool };
