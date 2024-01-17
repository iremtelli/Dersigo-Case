"use client"
import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getUserPosts } from "../../../../services/post"
import { Formik, Field, Form } from "formik"
import { getUserDetail, updateUser } from "../../../../services/user"
import toast from "react-hot-toast"
import LoadingSpin from "../../../../components/Loading"

export default function EditUserPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({})
  const router = useRouter()

  useEffect(() => {
    getPostList()
    getUser(params)
  }, [params])

  const getPostList = async () => {
    const response = await getUserPosts(params.id)
    setPosts(response?.data)
    setLoading(false)
  }

  const handleUpdateUser = async (values) => {
    console.log(values)
    const response = await updateUser(values, user.id)
    if (response.ok) {
      toast.success("User updated")
      router.push("/")
    }
  }

  const getUser = async (params) => {
    const response = await getUserDetail(params.id)
    setUser(response)
  }

  if (loading || !user) {
    return <LoadingSpin />
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 ">User </h1>
        <Formik
          initialValues={{
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
          }}
          onSubmit={(values) => {
            handleUpdateUser(values)
          }}
          enableReinitialize
        >
          <Form className="space-y-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <Field
              id="firstName"
              name="firstName"
              placeholder="Jane"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />

            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <Field
              id="lastName"
              name="lastName"
              placeholder="Doe"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />

            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Field
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
