import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.CMS_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD;

// Validate critical env vars on module load
if (!JWT_SECRET) {
  console.error('❌ CRITICAL: JWT_SECRET not set in environment variables');
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET is required in production environment');
  }
}

if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
  console.error('❌ CRITICAL: CMS_ADMIN_USERNAME or CMS_ADMIN_PASSWORD not set in environment variables');
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Admin credentials are required in production environment');
  }
}

if (JWT_SECRET && JWT_SECRET.length < 32) {
  console.error('❌ CRITICAL: JWT_SECRET must be at least 32 characters long for security');
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }
}


export function generateToken(username: string, expiresIn: string = '24h'): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.sign({ username }, JWT_SECRET as string, { expiresIn } as any);
}

export function verifyToken(token: string): { username: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as { username: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

// helper to validate token string and return decoded or null
export function validateTokenString(token?: string | null) {
  if (!token) return null;
  return verifyToken(token);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME) return false;
  if (password !== ADMIN_PASSWORD) return false;
  return true;
}
