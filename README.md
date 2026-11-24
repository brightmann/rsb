# rsb

Blog built with [react-static](https://github.com/react-static/react-static), deployed to GitHub Pages.

## Posts

Add Markdown files to `posts/`:

```
---
title: My Post
date: 2026-11-23
---

Post body in Markdown. Raw HTML (iframes, embeds) is supported.
```

The filename (without `.md`) becomes the post URL: `/post/<filename>`.

Posts are listed newest first, 5 per page.

## Develop

```
npm install
npm start
```

## Build

```
npm run build
```

Pushing to `main` deploys automatically via GitHub Actions.
