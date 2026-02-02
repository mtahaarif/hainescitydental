import { NextResponse } from 'next/server';

export async function GET() {
  const env = {
    HOSTGATOR_DB_HOST: process.env.HOSTGATOR_DB_HOST ? 'SET' : 'MISSING',
    HOSTGATOR_DB_USER: process.env.HOSTGATOR_DB_USER ? 'SET' : 'MISSING',
    HOSTGATOR_DB_PASSWORD: process.env.HOSTGATOR_DB_PASSWORD ? 'SET' : 'MISSING',
    HOSTGATOR_DB_NAME: process.env.HOSTGATOR_DB_NAME ? 'SET' : 'MISSING',
    HOSTGATOR_DB_PORT: process.env.HOSTGATOR_DB_PORT ? 'SET' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV,
  };
  
  return NextResponse.json({ status: 'ok', environment: env }, { status: 200 });
}
