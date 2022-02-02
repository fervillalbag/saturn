import React, { useState } from 'react'
import { GetServerSideProps } from 'next'

import { Post } from '@/types/Post'
import { Like } from '@/types/Like'

interface PostDetailIprops {
  post: Post
  likes: Like[]
}

type DataType = {
  props: {
    post: Post
    likes: Like[]
  }
}

const PostDetail: React.FC<PostDetailIprops> = ({ post, likes }) => {
  const [isLoading, setIsLoading] = useState(false)

  console.log(likes)

  const dataSend = {
    idPost: post._id,
    idUser: '80942yrvillafasd8d7saf7da'
  }

  const handleAddLike = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('http://localhost:3000/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSend)
      })
      setIsLoading(false)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-4">
      <span className="block">title: {post.title}</span>
      <span className="block">description: {post.description}</span>

      {likes.map(
        (like: Like) =>
          like.idPost === post._id &&
          like.idUser === '80942yrvillafasd8d7saf7dafernando'
      ) ? (
        <div className="mt-4 text-green-600 font-bold">tiene me gusta</div>
      ) : (
        <div className="mt-4 text-red-600 font-bold">NO tiene me gusta</div>
      )}

      <button
        disabled={isLoading}
        className={`border block mt-4 p-2 disabled:bg-red-300`}
        onClick={handleAddLike}
      >
        like
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query
}): Promise<DataType> => {
  const res = await fetch(`http://localhost:3000/api/post/${query.id}`)
  const post = await res.json()

  const resLike = await fetch(`http://localhost:3000/api/like`)
  const likes = await resLike.json()

  return {
    props: {
      post,
      likes
    }
  }
}

export default PostDetail
