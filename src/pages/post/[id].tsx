import React from 'react'
import { GetServerSideProps } from 'next'

import { Post } from '@/types/Post'

interface PostDetailIprops {
  post: Post
}

type DataType = {
  props: {
    post: Post
  }
}

const PostDetail: React.FC<PostDetailIprops> = ({ post }) => {
  console.log(post)

  return (
    <div className="p-4">
      <span className="block">title: {post.title}</span>
      <span className="block">description: {post.description}</span>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query
}): Promise<DataType> => {
  const res = await fetch(
    `https://saturn.fervillalbag.com/api/post/${query.id}`
  )
  const post = await res.json()

  return {
    props: {
      post
    }
  }
}

export default PostDetail
