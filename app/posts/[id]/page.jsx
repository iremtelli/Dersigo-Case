"use client"

import { getPostDetail } from "@/services/post"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const PostDetail = () => {
  const params = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPostDetail(params.id)
      .then((res) => {
        setPost(res)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p> title: {post.text}</p>
      <br />
      <img width={150} src={post.image} />
      <br />
      <p>likes: {post.likes}</p>
      <br />
      <p>
        owner: {post.owner?.firstName} {post.owner?.lastName}
      </p>
      <div className="flex gap-10 bg-red-500">
        tags:
        {post?.tags?.map((tag) => (
          <div>
            <Link href={`/tag/${tag}/post`}>{tag}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostDetail
