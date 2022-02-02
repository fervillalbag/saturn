import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from 'config/mongoConnect'
import Like from 'models/Like'

connectDB()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body, query } = req

  switch (method) {
    case 'GET':
      try {
        const isLike = await Like.findOne({ idPost: query.id }).where({
          idUser: body.idUser
        })
        if (!isLike) return res.status(201).json({ response: false })
        return res.status(200).json({ response: true })
      } catch (error) {
        console.log(error)
        return res.status(200).json({ msg: error })
      }

    case 'DELETE':
      try {
        const likeDeleted = await Like.findOneAndDelete({
          idPost: query.id,
          idUser: body.idUser
        })
        if (!likeDeleted) return res.status(201).json({ msg: 'Like not found' })
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
