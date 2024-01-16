"use client"
import { Formik, Field, Form } from "formik"
import React from "react"
import { createUser } from "../../../services/user"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function CreateUserPage() {
  const router = useRouter()

  const handleCreateUser = async (values) => {
    const response = await createUser(values)
    if (response.ok) {
      toast.success("User created")

      router.push("/")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 ">Sign Up</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
          }}
          onSubmit={(values) => {
            handleCreateUser(values)
          }}
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
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
