import type { NextApiRequest, NextApiResponse } from 'next'

import { API } from '@kvitkaphoto/constants'
import supabase from '@kvitkaphoto/supabase.config'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method
  const body = req.body

  console.log('>>> body ID', body)
  console.log('>>> requestMethod ID', requestMethod)

  switch (requestMethod) {
    // handle GET request
    case 'GET':
      try {
        const id = req.url?.replace(`${API.GALLERIES}/`, '')
        const { data, error, status } = await supabase
          .from('galleries')
          .select()
          .eq('id', id)

        if (error)
          throw {
            message: error.message,
            status
          }

        res.status(status).json(data)
      } catch (error: any) {
        console.log('error get', error)
        res.status(error.status).json({
          error: {
            message: error.message,
            status: error.status
          }
        })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${requestMethod} Not Allowed`)
      break
  }
}
