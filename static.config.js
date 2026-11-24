const fs = require('fs')
const path = require('path')
const MarkdownIt = require('markdown-it')

const md = new MarkdownIt({ html: true, linkify: true })

const POSTS_DIR = path.resolve(__dirname, 'posts')
const PAGE_SIZE = 5

function parsePost(filename) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    throw new Error(`Post ${filename} is missing frontmatter`)
  }
  const meta = {}
  match[1].split('\n').forEach(line => {
    const i = line.indexOf(':')
    if (i > -1) {
      meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
    }
  })
  const body = match[2].trim()
  return {
    slug: filename.replace(/\.md$/, ''),
    title: meta.title || filename.replace(/\.md$/, ''),
    date: meta.date || '',
    html: md.render(body),
  }
}

function excerpt(html, n) {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > n ? text.slice(0, n) + '…' : text
}

const posts = fs
  .readdirSync(POSTS_DIR)
  .filter(f => f.endsWith('.md'))
  .map(parsePost)
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export default {
  siteRoot: 'https://brightmann.github.io',
  basePath: 'rsb',
  assetsPath: '/',
  plugins: ['react-static-plugin-reach-router', 'react-static-plugin-sitemap'],
  getSiteData: () => ({
    title: 'rsb',
  }),
  getRoutes: async () => {
    const routes = []
    const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE))

    for (let page = 1; page <= totalPages; page++) {
      const pagePosts = posts
        .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
        .map(p => ({
          slug: p.slug,
          title: p.title,
          date: p.date,
          excerpt: excerpt(p.html, 160),
        }))
      routes.push({
        path: page === 1 ? '/' : `/page/${page}`,
        template: 'src/pages/Home',
        getData: () => ({ posts: pagePosts, page, totalPages }),
      })
    }

    posts.forEach(post => {
      routes.push({
        path: `/post/${post.slug}`,
        template: 'src/pages/Post',
        getData: () => ({ post }),
      })
    })

    routes.push({ path: '404', template: 'src/pages/404' })
    return routes
  },
}
