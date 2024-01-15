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
    <div>
      <h1>Sign Up</h1>
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
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="Jane" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}
