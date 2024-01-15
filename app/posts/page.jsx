"use client"
import React, { useEffect, useState } from "react"
import { getPosts } from "../../services/post"
import PostCard from "../../components/PostCard"
import Link from "next/link"

function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPostList()
  }, [])

  const getPostList = async () => {
    const response = await getPosts()
    setPosts(response?.data)
  }

  return (
    <div>
      <h1>Post List</h1>
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

export default Posts
