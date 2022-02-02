import { NextApiRequest, NextApiResponse } from 'next'

import Post from 'models/Post'
import connectDB from 'config/mongoConnect'

connectDB()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, query, body } = req

  switch (method) {
    case 'GET':
      try {
        const post = await Post.findOne({ _id: query.id })
        if (!post) return res.status(201).json({ msg: 'Post not found' })
        return res.status(200).json(post)
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'PUT':
      try {
        const postUpdated = await Post.findOneAndUpdate(
          { _id: query.id },
          body,
          {
            new: true
          }
        )
        if (!postUpdated) return res.status(201).json({ msg: 'Post not found' })
        return res.status(200).json({ msg: 'Post updated' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'DELETE':
      try {
        const postDeleted = await Post.findOneAndDelete({ _id: query.id })
        if (!postDeleted) return res.status(201).json({ msg: 'Post not found' })
        return res.status(200).json({ msg: 'Post deleted' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      return res.status(400).json({ msg: 'Method invalid' })
  }
}

export default handler
