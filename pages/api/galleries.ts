import type { NextApiRequest, NextApiResponse } from 'next'

import supabase from '../../supabase.config'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method
  const body = req.body

  // console.log(">>> req", req);
  // console.log(">>> res", res);

  // console.log(">>> body", body);
  // console.log(">>> requestMethod", requestMethod);

  switch (requestMethod) {
    // handle POST request
    case 'POST':
      try {
        const { error, status, statusText } = await supabase
          .from('galleries')
          .insert({
            id: body.id,
            title: body.title,
            images: body.images
          })

        if (error)
          throw {
            message: error.message,
            status
          }

        res.status(status).json({
          message: statusText,
          status
        })
      } catch (error: any) {
        res.status(error.status).json({
          error: {
            message: error.message,
            status: error.status
          }
        })
      }
      break
    // handle GET request
    case 'GET':
      try {
        const { data, error, status } = await supabase
          .from('galleries')
          .select()

        if (error)
          throw {
            message: error.message,
            status
          }

        res.status(status).json(data)
      } catch (error: any) {
        console.log('error', error)
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
