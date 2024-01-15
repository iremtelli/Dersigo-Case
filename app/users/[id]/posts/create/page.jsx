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
    <div>
      <h1>Create Post</h1>
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
        <Form>
          <br />
          <label htmlFor="text">Text</label>
          <Field id="text" name="text" placeholder="Enter post text" />
          <ErrorMessage name="text" component="div" />
          <br />
          <label htmlFor="image">Image URL</label>
          <Field id="image" name="image" placeholder="Enter image URL" />
          <ErrorMessage name="image" component="div" />
          <br />
          <label htmlFor="likes">Likes</label>
          <Field
            id="likes"
            name="likes"
            type="number"
            placeholder="Enter initial likes"
          />
          <br />
          <label htmlFor="tags">Tags</label>
          <Field id="tags" name="tags" placeholder="Enter tags " />
          <br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}
