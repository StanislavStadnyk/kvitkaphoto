import type { NextApiRequest, NextApiResponse } from 'next'

import supabase from '../../supabase.config'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: req.body.email,
      password: req.body.password
    })

    if (error) throw error
    res.status(200).json(data)
  } catch (error: any) {
    res.status(error.status).json({
      error: {
        message: error.message,
        status: error.status
      }
    })
  }
}
