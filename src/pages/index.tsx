import React from 'react'
import { GetServerSideProps } from 'next'

import { Post } from '@/types/Post'
import { useRouter } from 'next/dist/client/router'

interface HomeIprops {
  posts: Post[]
}

type DataType = {
  props: {
    posts: Post[]
  }
}

const Home: React.FC<HomeIprops> = ({ posts }) => {
  const router = useRouter()

  return (
    <div className="p-4">
      {posts.length === 0 ? (
        <span className="block">there are no posts</span>
      ) : (
        posts.map((post: Post) => (
          <div key={post._id}>
            <span className="block">{post.title}</span>
          </div>
        ))
      )}

      <div className="mt-2">
        <button
          className="border p-2"
          onClick={() => router.push('post/create')}
        >
          create a post
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps =
  async (): Promise<DataType> => {
    const res = await fetch('http://localhost:3000/api/post')
    const posts = await res.json()

    return {
      props: {
        posts
      }
    }
  }

export default Home
