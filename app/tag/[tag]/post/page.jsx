"use client"
import LoadingSpin from "../../../../components/Loading"
import PostCard from "../../../../components/PostCard"
import { getPostsByTag } from "../../../../services/post"
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
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">{params.tag}: Tag Posts</h1>
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <LoadingSpin />
      )}
    </div>
  )
}

export default TagPost
