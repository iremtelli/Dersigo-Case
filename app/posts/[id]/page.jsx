"use client"
import { getPostDetail } from "../../../services/post"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import LoadingSpin from "../../../components/Loading"

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
    return <LoadingSpin />
  }

  return (
    <div className="container mx-auto ">
      <div className="bg-white p-6 md:p-6 lg:p-8 max-w-sm mx-auto rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4">
          <span>{post.title}</span> {post?.owner?.firstName}{" "}
          {post?.owner?.lastName}
        </h1>
        <img className="mb-4" width={150} src={post?.image} alt="Post Image" />
        <p className="mb-4">
          <span className="font-bold">Title:</span> {post?.text}
        </p>
        <p className="mb-4">
          <span className="font-bold">Likes:</span> {post?.likes}
        </p>
        <p className="mb-4">
          <span className="font-bold">Publish Date:</span> {post.publishDate}/
          {post?.publishHour}
        </p>
        <p className="mb-4">
          <span className="font-bold">Link:</span> {post?.link}
        </p>

        <div className="flex gap-4">
          <span className="font-bold">Tags:</span>
          {post?.tags?.map((tag) => (
            <div>
              <Link href={`/tag/${tag}/post`} className="text-blue-500">
                {tag}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostDetail
