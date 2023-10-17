import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600')
  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
                      <urlset
                            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                                  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
                      
                      <url>
                        <loc>https://www.kvitkaphoto.com.au/</loc>
                        <lastmod>2023-10-17T00:46:09+00:00</lastmod>
                        <priority>1.00</priority>
                      </url>
                      <url>
                        <loc>https://www.kvitkaphoto.com.au/pricing</loc>
                        <lastmod>2023-10-17T00:46:09+00:00</lastmod>
                        <priority>0.80</priority>
                      </url>
                      <url>
                        <loc>https://www.kvitkaphoto.com.au/galleries/all</loc>
                        <lastmod>2023-10-17T00:46:09+00:00</lastmod>
                        <priority>0.80</priority>
                      </url>
                      <url>
                        <loc>https://www.kvitkaphoto.com.au/about</loc>
                        <lastmod>2023-10-17T00:46:09+00:00</lastmod>
                        <priority>0.80</priority>
                      </url>
                      <url>
                        <loc>https://www.kvitkaphoto.com.au/contacts</loc>
                        <lastmod>2023-10-17T00:46:09+00:00</lastmod>
                        <priority>0.80</priority>
                      </url>
                      
                      
                      </urlset>`
  res.end(xml)
}
