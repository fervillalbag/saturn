import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from 'config/mongoConnect'
import Like from 'models/Like'

connectDB()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, query } = req

  switch (method) {
    case 'DELETE':
      try {
        const postDeleted = await Like.findOneAndDelete({ _id: query.id })
        if (!postDeleted) return res.status(201).json({ msg: 'Like not found' })
        return res.status(200).json({ msg: 'Like deleted' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      return res.status(400).json({ msg: 'Method invalidate' })
  }
}

export default handler
