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
    return <div>Loading...</div>
  }

  if (!post) {
    return <div>Post Bulanamadı!</div>
  }

  return (
    <div>
      <h1>Edit Post: {post.text}</h1>
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

export default EditPost
