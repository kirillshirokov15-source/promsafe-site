/**
 * Keep temporary Railway deployments outside search until the owner has
 * approved the canonical domain, legal documents, URLs and crawl behavior.
 * Setting NEXT_PUBLIC_SITE_ENV=production alone is not enough to index a site.
 */
export function indexableSite(){
  const url=(process.env.NEXT_PUBLIC_SITE_URL||'').replace(/\/$/,'').toLowerCase();
  return process.env.NEXT_PUBLIC_SITE_ENV==='production'
    && process.env.SITE_INDEXING_APPROVED==='true'
    && (url==='https://promsafe.ru'||url==='https://www.promsafe.ru');
}
