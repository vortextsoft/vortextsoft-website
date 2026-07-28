import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO component using react-helmet-async.
 * Configured with official legal name: Vortextsoft Pentra (Pvt) Ltd
 */
const SEO = ({
  title,
  description = 'Vortextsoft Pentra (Pvt) Ltd delivers cutting-edge, scalable software solutions — AI/ML, web, mobile, ERP, IoT and more. Let\'s build your future together.',
  keywords = 'Vortextsoft Pentra (Pvt) Ltd, Vortextsoft Pentra, Vortextsoft, Vortexsoft, Vortext Soft, Vortex Soft, Vortextsoft Pentra Pvt Ltd, software agency Sri Lanka',
  path = '',
  image = '/vortextsoft-3d-logo.png',
  type = 'website',
  noIndex = false,
}) => {
  const SITE_NAME  = 'Vortextsoft Pentra';
  const LEGAL_NAME = 'Vortextsoft Pentra (Pvt) Ltd';
  const BASE_URL   = 'https://vortextsoft.com';
  const TWITTER_HANDLE = '@vortextsoft';

  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${LEGAL_NAME} — Innovative Software Solutions`;
  const canonical = `${BASE_URL}${path}`;
  const ogImage   = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  // Clamp description to 155 characters for optimal SERP display
  const safeDescription =
    description.length > 155 ? `${description.substring(0, 152)}...` : description;

  return (
    <Helmet>
      {/* ── Core Metadata ────────────────────────────────────── */}
      <title>{pageTitle}</title>
      <meta name="description" content={safeDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={LEGAL_NAME} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph ───────────────────────────────────────── */}
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:title"       content={pageTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:alt"   content={`${LEGAL_NAME} — ${title || 'Home'}`} />
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
