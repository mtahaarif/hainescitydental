import { NextResponse } from 'next/server';

export async function GET() {
  const endpoint = process.env.WORDPRESS_API_URL;
  if (!endpoint) {
    return NextResponse.json({ ok: false, error: 'WORDPRESS_API_URL not configured' }, { status: 500 });
  }

  const start = Date.now();
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ __typename }' }),
    });

    const duration = Date.now() - start;

    return NextResponse.json(
      {
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
        timeMs: duration,
        url: endpoint,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
