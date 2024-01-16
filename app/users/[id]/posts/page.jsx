"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getUserPosts } from "../../../../services/post"
import Link from "next/link"
import PostCard from "../../../../components/PostCard"
import { getUserDetail } from "../../../../services/user"

export default function EditUserPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    getPostList()
    getUser()
  }, [])

  const getPostList = async () => {
    const response = await getUserPosts(params.id)
    setPosts(response?.data)
    setLoading(false)
  }

  const getUser = async () => {
    const response = await getUserDetail(params.id)
    setUser(response)
  }

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <div className="container mx-auto my-8">
      {user && (
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {user.title} {user.firstName} {user.lastName}
          </h1>
          <img
            src={user.picture}
            alt={`${user.firstName} ${user.lastName}`}
            className="rounded-full w-20 h-20 object-cover mb-2"
          />
          <p className="mb-2">Email: {user.email}</p>
          <p className="mb-2">Phone: {user.phone}</p>
          <p className="mb-2">Location: {user.location?.country}</p>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Post List</h1>
      <Link
        href={`/users/${params.id}/posts/create`}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
      >
        Create Post
      </Link>

      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              updateable
              deleteable
              editUrl={`/users/${params.id}/posts/${post.id}/edit`}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  )
}
