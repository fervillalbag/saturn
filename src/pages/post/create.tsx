import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'

interface PostData {
  title: string
  description: string
}

const PostCreate: React.FC = () => {
  const router = useRouter()

  const [postData, setPostData] = useState<PostData>({
    title: '',
    description: ''
  })

  const handleCreatePost = async () => {
    try {
      const newPost = await fetch('https://saturn.fervillalbag.com/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      console.log(newPost)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-4">
      <span className="block">post create</span>

      <div className="mt-4">
        <div className="py-4">
          <input
            type="text"
            className="border p-2 w-full"
            value={postData.title}
            onChange={e => setPostData({ ...postData, title: e.target.value })}
          />
        </div>
        <div className="py-4">
          <textarea
            className="w-full border p-2 h-32"
            value={postData.description}
            onChange={e =>
              setPostData({ ...postData, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="py-4">
          <button className="border p-2" onClick={handleCreatePost}>
            submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCreate
