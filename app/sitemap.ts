export const baseUrl = 'https://ekluthra.com'

export default async function sitemap() {
  let routes = ['', '/resume'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return routes
}
