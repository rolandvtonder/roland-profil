// Files in /public are served from the site's base path: '/' when you run the
// site locally (and later on rolandwebdesign.co.za), but '/roland-profil/' on
// GitHub Pages, because the site sits in a subfolder there.
// Run every /public path through this so images work wherever the site lives.
export function asset(path: string) {
  return import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
}
