"use client"
import Link from "next/link"
import React from "react"
import { deletePostService } from "../services/post"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"

function PostCard({ post, updateable, deleteable, editUrl = "/" }) {
  const router = useRouter()
  const deletePost = async (postId) => {
    try {
      await deletePostService(postId)
      toast.success("Post deleted")
      router.push("/posts")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Link
      className="bg-white shadow-md p-4 rounded-md mb-4"
      href={`/posts/${post.id}`}
    >
      <h1 className="text-xl font-bold mb-2">
        {post.owner.title} {post.owner.firstName} {post.owner.lastName}
      </h1>

      <img
        src={post.image}
        className="w-full h-48 object-cover mb-2"
        alt="Post Image"
      />
      <p className="text-gray-500 mb-2">{post.tags}</p>
      <p className="text-gray-700 mb-2">{post.likes} Likes</p>
      <p className="text-gray-500 mb-2">Published on {post.publishDate}</p>
      <p className="text-gray-700 mb-4">{post.text}</p>
      {updateable && (
        <Link href={editUrl} className="text-blue-500 hover:underline mr-2">
          Update Post
        </Link>
      )}

      <button
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        onClick={() => deletePost(post.id)}
      >
        Delete Post
      </button>
    </Link>
  )
}

export default PostCard
