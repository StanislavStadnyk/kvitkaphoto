import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.send(`User-Agent: *
                  Allow: /
                  Disallow: /private/
                  
                  Sitemap: https://www.kvitkaphoto.com.au/sitemap.xml`)
}
