import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production_min_32_chars_long_!@#$%^&*()';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'hainescitydental';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gATORRAID@422';

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long');
}

export function generateToken(username: string, expiresIn: string = '24h'): string {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): { username: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
    return decoded;
  } catch (error) {
    return null;
  }
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
