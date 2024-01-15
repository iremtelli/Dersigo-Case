"use client"
import Link from "next/link"
import React from "react"

function PostCard({ post, updateable, deleteable, editUrl = "/" }) {
  console.log(post, updateable, deleteable)
  return (
    <div>
      <Link href={`/posts/${post.id}`}>{post.text}</Link>
      <img src={post.image} width={200} />
      {updateable && <Link href={editUrl}>Update Post</Link>}
      {deleteable && <button>Delete Post</button>}
    </div>
  )
}

export default PostCard
