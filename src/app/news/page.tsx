/*
  This page now embeds the external News page HTML from the production site.
  It performs a server-side fetch and injects the returned HTML into the page.
  This keeps the News content identical to the external site; assets and styles
  are served by the fetched HTML unless rewritten locally.
*/

export const revalidate = 3600;

export default async function NewsPage() {
  const res = await fetch('https://www.hainescitydental.com/news/', { cache: 'no-store' });
  const html = await res.text();

  return (
    <div className="min-h-screen">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
