// Where "home" is, and whether we are already there.
//
// The site is served from BASE_URL: '/' on rolandwebdesign.co.za, but a
// subfolder if it is ever built for GitHub Pages again. Both the home link
// and the are-we-home test go through it rather than hard-coding '/'.
export const homeHref = import.meta.env.BASE_URL

export function isHomepage() {
  if (typeof window === 'undefined') return false
  const strip = (p: string) => p.replace(/\/+$/, '')
  return strip(window.location.pathname) === strip(homeHref)
}
