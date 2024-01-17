"use client"
import {
  UpdatePost,
  getPostDetail,
  updatePost,
} from "../../../../../../services/post"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import LoadingSpin from "../../../../../../components/Loading"

function EditPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  useEffect(() => {
    getPostDetail(params.post_id)
      .then((response) => {
        setPost(response)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleUpdatePost = async (values) => {
    if (!Array.isArray(values.tags)) {
      values.tags = values.tags.split(",")
    }
    const response = await updatePost(values, params.post_id)
    if (response.ok) {
      toast.success("Post updated")
    }
  }

  const validateForm = (values) => {
    const errors = {}
    const text = "Field is required"
    if (!values.text) {
      errors.text = text
    } else if (!values.image) {
      errors.image = text
    }
    return errors
  }

  if (loading) {
    return <LoadingSpin />
  }

  if (!post) {
    return <div>Post Bulanamadı!</div>
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8  bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Post: {post.text}</h1>
      <Formik
        initialValues={{
          text: post.text,
          image: post.image,
          tags: post.tags,
          likes: post.likes,
          owner: params.id,
        }}
        validate={(values) => validateForm(values)}
        onSubmit={(values) => {
          handleUpdatePost(values)
        }}
      >
        <Form>
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-sm font-semibold text-gray-600"
            >
              Text
            </label>
            <Field
              id="text"
              name="text"
              placeholder="Enter post text"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="text"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-600"
            >
              Image URL
            </label>
            <Field
              id="image"
              name="image"
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter image URL"
            />
            <ErrorMessage
              name="text"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="likes"
              className="block text-sm font-semibold text-gray-600"
            >
              Likes
            </label>
            <Field
              id="likes"
              name="likes"
              type="number"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter initial likes"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block text-sm font-semibold text-gray-600"
            >
              Tags
            </label>
            <Field
              id="tags"
              name="tags"
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter tags"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default EditPost
