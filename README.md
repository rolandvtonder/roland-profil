# Roland Web Design — portfolio site

The portfolio site for **Roland Web Design** (Brackenhurst, Alberton, South Africa) —
rolandwebdesign.co.za.

Built with Vite, React 19, TypeScript, Tailwind CSS v4 and Framer Motion.

## Running it locally

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173/).
On Windows you can also just double-click **`Open my website.bat`**, which does both steps
and opens your browser.

Other commands:

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run lint      # eslint
```

## Where things live

| Path | What's in it |
|------|--------------|
| `src/content.ts` | **All the copy and data** — services, projects, FAQ, contact details. Edit here first. |
| `src/components/` | The page sections: Hero, Work, How it works, Services, About, FAQ, Contact, Footer. |
| `src/index.css` | Brand tokens (midnight + electric blue) and global styles. |
| `public/work/` | Full-page screenshots of the sites in the Work section. |
| `public/og-image.jpg` | The link-preview card shown when the site is shared. |
| `Media/` | Logo SVGs, profile avatars and portfolio exports (not used by the site itself). |

## Notes

- Anything marked `PLACEHOLDER` in `src/content.ts` still needs real content.
- The contact form emails through [Web3Forms](https://web3forms.com) once an access key is
  set in `site.web3formsKey`; without one it opens the visitor's email app instead.
