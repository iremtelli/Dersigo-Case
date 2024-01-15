"use client"
import PostCard from "@/components/PostCard"
import { getPostsByTag } from "@/services/post"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

function TagPost() {
  const params = useParams()
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    getPostsByTag(params.tag).then((res) => {
      setPosts(res.data)
    })
  }, [])

  return (
    <div>
      <h1>{params.tag}: Tag Posts</h1>
      {posts && posts.length > 0 ? (
        <div>
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  )
}

export default TagPost
