"use client"
import { Formik, Field, Form, ErrorMessage } from "formik"
import React from "react"
import { createPost } from "../../../../../services/post"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function CreatePostPage() {
  const router = useRouter()
  const params = useParams()

  const handleCreatePost = async (values) => {
    if (values.tags) {
      values.tags = values.tags.split(",")
    }

    const res = await createPost(values)
    if (res.ok) {
      toast.success("Post created")
      router.push(`/users/${params.id}/posts`)
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

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <Formik
        initialValues={{
          text: "",
          image: "",
          tags: [],
          likes: 0,
          owner: params.id,
        }}
        validate={(values) => validateForm(values)}
        onSubmit={(values) => {
          handleCreatePost(values)
        }}
      >
        <Form className="space-y-4">
          <br />
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-600"
          >
            Text
          </label>
          <Field
            id="text"
            name="text"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter post text"
          />
          <ErrorMessage
            name="text"
            component="div"
            className="text-red-500 text-sm"
          />
          <br />
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Image URL
          </label>
          <Field
            id="image"
            name="image"
            placeholder="Enter image URL"
            className="mt-1 p-2 w-full border rounded-md"
          />
          <ErrorMessage
            name="image"
            component="div"
            className="text-red-500 text-sm"
          />
          <br />
          <label
            htmlFor="likes"
            className="block text-sm font-medium text-gray-600"
          >
            Likes
          </label>
          <Field
            id="likes"
            name="likes"
            type="number"
            placeholder="Enter initial likes"
          />
          <br />
          <label htmlFor="tags">Tags</label>
          <Field
            id="tags"
            name="tags"
            placeholder="Enter tags "
            className="mt-1 p-2 w-full border rounded-md"
          />
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  )
}
