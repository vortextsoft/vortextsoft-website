import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO component using react-helmet-async.
 *
 * Usage:
 *   <SEO
 *     title="Services"
 *     description="Explore Vortextsoft's full range of software development services..."
 *     path="/services"
 *     image="/og-image.png"
 *   />
 *
 * All props are optional — sensible defaults are provided for every field.
 */
const SEO = ({
  title,
  description = 'Vortextsoft delivers cutting-edge, scalable software solutions — AI/ML, web, mobile, ERP, IoT and more. Let\'s build your future together.',
  path = '',
  image = '/og-image.png',
  type = 'website',
  noIndex = false,
}) => {
  const SITE_NAME  = 'Vortextsoft';
  const BASE_URL   = 'https://vortextsoft.com';
  const TWITTER_HANDLE = '@vortextsoft';

  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Innovative Software Solutions`;
  const canonical = `${BASE_URL}${path}`;
  const ogImage   = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  // Clamp description to 155 characters for optimal SERP display
  const safeDescription =
    description.length > 155 ? `${description.substring(0, 152)}...` : description;

  return (
    <Helmet>
      {/* ── Core ──────────────────────────────────────────────── */}
      <title>{pageTitle}</title>
      <meta name="description" content={safeDescription} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph ───────────────────────────────────────── */}
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:title"       content={pageTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:alt"   content={`${SITE_NAME} — ${title || 'Home'}`} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="en_US" />

      {/* ── Twitter Card ─────────────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER_HANDLE} />
      <meta name="twitter:creator"     content={TWITTER_HANDLE} />
      <meta name="twitter:title"       content={pageTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image"       content={ogImage} />
    </Helmet>
  );
};

export default SEO;
