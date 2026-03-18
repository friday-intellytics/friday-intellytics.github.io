# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing site for **Friday Intellytics** (fridayintellytics.com) — an AI-assisted analytics consultancy. Hosted on GitHub Pages with a custom domain via CNAME.

## Architecture

- **Pure static HTML/CSS** — no build tools, no framework, no package.json
- All styling is inline (`<style>` blocks) using CSS custom properties defined in each page's `:root`
- JavaScript is minimal and inline (e.g., contact form submission via Web3Forms API)
- Fonts loaded from Google Fonts: Inter (body) and Playfair Display (headings)
- SEO metadata on every page: Open Graph, Twitter Cards, JSON-LD structured data

## Site Structure

- `/index.html` — Landing page (hero, services, blog callout)
- `/blog/index.html` — Blog listing ("Perspectives")
- `/blog/*/index.html` — Individual blog posts
- `/contact/index.html` — Contact form (Web3Forms integration)
- `/assets/images/` — Logos and share cards
- `CNAME`, `robots.txt`, `sitemap.xml` — GitHub Pages and SEO config

## Development

No build step. Edit HTML files directly and push. The site is served by GitHub Pages from the default branch.

To preview locally, use any static file server:
```
python3 -m http.server 8000
```

## Key Conventions

- **Color palette**: Orange primary (`#e8680c`), yellow accent (`#c8930a`), white background, dark text (`#1a1a1a`)
- **Responsive breakpoints**: 900px (grid → single column), 640px (hide mobile nav items)
- **Navigation**: Fixed top nav with blur backdrop; consistent across all pages using relative paths (`../`)
- **Blog posts** include article-level JSON-LD schema (author, datePublished, dateModified)
- **Contact form** posts to Web3Forms API; the `message` field doubles as `subject` and is optional

## Files to Know

- `sitemap.xml` — Update when adding new pages
- `todo.md` — Tracks pending content and development tasks
- `seo-checklist.md` — SEO validation reference
- `page_analytics.md` — Planned (not yet implemented) analytics heatmap system
