"use client"
import React, { useEffect, useState } from "react"
import { getPosts } from "../../services/post"

import PostCard from "../../components/PostCard"

function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPostList()
  }, [])

  const getPostList = async () => {
    try {
      const response = await getPosts()
      setPosts(response?.data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Post List</h1>
      </div>
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No posts available.</p>
      )}
    </div>
  )
}

export default Posts
