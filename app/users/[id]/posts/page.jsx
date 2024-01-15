"use client"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getUserPosts } from "@/services/post"
import Link from "next/link"
import PostCard from "@/components/PostCard"
import { getUserDetail } from "@/services/user"

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
    console.log(response)
  }

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <div>
      {user && (
        <div>
          <h1>
            {user.title} {user.firstName} {user.lastName}
          </h1>
          <img src={user.picture} />
          <p>Email:{user.email}</p>
          <p>Phone:{user.phone}</p>
          <p>Location:{user.location?.country}</p>
        </div>
      )}
      <br />
      <h1>Post List</h1>
      <Link href={`/users/${params.id}/posts/create`}>Create Post</Link>
      {posts && posts.length > 0 ? (
        <div>
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
        <p>loading...</p>
      )}
    </div>
  )
}
