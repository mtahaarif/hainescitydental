import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production_min_32_chars_long_!@#$%^&*()';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'hainescitydental';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gATORRAID@422';

// Generate JWT token
export function generateToken(username: string) {
  return jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
}

// Verify JWT token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { username: string; role: string };
  } catch (error) {
    return null;
  }
}

// Hash password
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

// Compare passwords
export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// Verify admin credentials
export async function verifyAdminCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
