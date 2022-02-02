import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from 'config/mongoConnect'
import Like from 'models/Like'

connectDB()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req

  switch (method) {
    case 'POST':
      try {
        const newLike = await new Like(body)
        await newLike.save()
        return res.status(200).json({ msg: 'like created' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      return res.status(400).json({ msg: 'Method invalidate' })
  }
}

export default handler
