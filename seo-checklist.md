# SEO Checklist

Run after every blog post or landing page update. Check every item. If anything fails, fix before merging.

---

## Target Keywords

These must appear naturally across every page. If a page doesn't hit all three, it needs copy work.

- **AI-Assisted Analytics**
- **Analytics Experience**
- **Fast Insights**

---

## 1. Title Tag

- [ ] Present and unique (not duplicated across pages)
- [ ] Under 60 characters
- [ ] Contains at least one target keyword
- [ ] Reads naturally — not keyword-stuffed
- [ ] Brand name ("Friday") included

## 2. Meta Description

- [ ] Present
- [ ] 120–155 characters
- [ ] Contains at least two target keywords
- [ ] Has a clear value proposition (why click?)
- [ ] Unique per page

## 3. Canonical URL

- [ ] `<link rel="canonical">` present
- [ ] Points to the correct absolute URL
- [ ] No trailing slash mismatch (pick one convention, stick with it)

## 4. Open Graph Tags

- [ ] `og:title` present and matches or complements the title tag
- [ ] `og:description` present
- [ ] `og:url` matches canonical
- [ ] `og:type` set (`website` for landing, `article` for blog posts)
- [ ] `og:image` set (at least 1200x630px) — **TODO: add share image**

## 5. Twitter Card Tags

- [ ] `twitter:card` set (`summary` or `summary_large_image`)
- [ ] `twitter:title` present
- [ ] `twitter:description` present
- [ ] `twitter:image` set — **TODO: add share image**

## 6. Headings

- [ ] Exactly one `<h1>` per page
- [ ] `<h1>` contains a target keyword
- [ ] Heading hierarchy is sequential (h1 → h2 → h3, no skips)
- [ ] `<h2>`s contain target keywords where natural
- [ ] No headings used purely for styling (use CSS instead)

## 7. Keyword Placement

For each target keyword, check:

| Keyword | title | meta desc | h1 | h2 | body (2+ times) | structured data |
|---------|-------|-----------|----|----|------------------|-----------------|
| AI-Assisted Analytics | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Analytics Experience | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Fast Insights | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

- [ ] No single keyword appears more than 6–7 times total (avoid over-optimization)
- [ ] Keywords appear in `<strong>` or `<b>` at least once in body copy

## 8. Structured Data (JSON-LD)

- [ ] `<script type="application/ld+json">` present
- [ ] Valid JSON (no trailing commas, no syntax errors)
- [ ] `@type` is appropriate (`ProfessionalService` for landing, `Article` or `BlogPosting` for blog)
- [ ] `name`, `description`, `url` populated
- [ ] For blog posts: `headline`, `author`, `datePublished`, `dateModified` present
- [ ] Test with: https://search.google.com/structured-data/testing-tool

## 9. Semantic HTML

- [ ] Page has `<header>`, `<main>`, `<footer>`
- [ ] Nav uses `<nav>` with `aria-label`
- [ ] Content sections use `<section>` or `<article>` with `aria-label`
- [ ] Images have descriptive `alt` text (not empty, not "image")
- [ ] Decorative elements have `aria-hidden="true"`

## 10. Links

- [ ] Internal links use relative paths or consistent absolute URLs
- [ ] External links have `rel="noopener"` (and `target="_blank"` if applicable)
- [ ] No broken links (click-test each one)
- [ ] CTA links have descriptive anchor text (not "click here")
- [ ] Blog posts link back to landing page

## 11. Performance

- [ ] No render-blocking scripts in `<head>` (use `defer` or `async`)
- [ ] Fonts use `<link rel="preconnect">` for external font hosts
- [ ] Images are optimized (WebP preferred, compressed)
- [ ] Total page weight under 500KB (excluding fonts)
- [ ] No unused CSS or JS

## 12. Mobile

- [ ] `<meta name="viewport">` present
- [ ] Text readable without zooming (base font >= 16px)
- [ ] Tap targets at least 44x44px
- [ ] No horizontal scroll
- [ ] Test at 375px width (iPhone SE)

## 13. Indexing

- [ ] `<meta name="robots" content="index, follow">` present
- [ ] Page is not blocked in robots.txt
- [ ] Sitemap exists at `/sitemap.xml` — **TODO: create sitemap**
- [ ] New pages are added to sitemap

## 14. Blog Post Extras (skip for landing page)

- [ ] `<meta property="og:type" content="article">`
- [ ] `article:published_time` and `article:modified_time` set
- [ ] Author meta present
- [ ] Post has a clear publish date visible on the page
- [ ] JSON-LD uses `BlogPosting` or `Article` schema with `headline`, `author`, `datePublished`
- [ ] Post links to related content or the landing page

---

## Quick Validation Commands

Paste the deployed URL into each:

1. **Structured Data** — https://search.google.com/structured-data/testing-tool
2. **Rich Results** — https://search.google.com/test/rich-results
3. **Mobile Friendly** — https://search.google.com/test/mobile-friendly
4. **PageSpeed** — https://pagespeed.web.dev/
5. **OG/Twitter preview** — https://www.opengraph.xyz/

---

## TODOs (one-time, not per-update)

- [ ] Create and deploy `/sitemap.xml`
- [ ] Create a social share image (1200x630) and add `og:image` / `twitter:image` to all pages
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Search Console and verify ownership
