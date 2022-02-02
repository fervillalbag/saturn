import { NextApiRequest, NextApiResponse } from 'next'

import Post from 'models/Post'
import connectDB from 'config/mongoConnect'

connectDB()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req

  switch (method) {
    case 'POST':
      try {
        const newPost = await new Post(body)
        await newPost.save()
        return res.status(200).json({ msg: 'Created' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'GET':
      try {
        const posts = await Post.find({})
        if (!posts) return res.status(202).json({ msg: 'Tasks not found' })

        return res.status(200).json(posts)
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      return res.status(400).json({ msg: 'Method not valid' })
  }
}

export default handler
