export type GraphQLVariables = Record<string, any> | undefined;

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

if (!WORDPRESS_API_URL) {
  // Avoid throwing on module load in environments that intentionally don't use WP, but warn
  // If you want to fail fast in production, replace console.warn with a thrown error.
  // Note: Vercel environment variables must be set in the Vercel dashboard for production.
  // See README instructions in this response.
  // eslint-disable-next-line no-console
  console.warn('WARNING: WORDPRESS_API_URL is not set. Please set it in .env.local or in Vercel environment variables.');
}

export async function fetchGraphQL<T = any>(query: string, variables?: GraphQLVariables): Promise<T> {
  const endpoint = WORDPRESS_API_URL as string | undefined;
  if (!endpoint) {
    throw new Error('WORDPRESS_API_URL is not defined. Set it in your environment (.env.local) or on Vercel.');
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText} - ${text}`);
  }

  const json = await res.json();

  if (json.errors && json.errors.length) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}
