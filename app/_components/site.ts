export const REPO_URL = "https://github.com/0xPolybit/cp-ally-ide";
export const RELEASES_URL = `${REPO_URL}/releases`;
export const VERSION = "v0.2.2";

// Public site origin, used for metadataBase / sitemap / robots. Override in
// production via NEXT_PUBLIC_SITE_URL (no trailing slash).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cp-ally-ide.vercel.app"
).replace(/\/$/, "");
