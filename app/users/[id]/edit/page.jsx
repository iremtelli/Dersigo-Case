"use client"
import { Formik, Field, Form } from "formik"
import React, { useEffect, useState } from "react"
import { updateUser, getUserDetail } from "../../../../services/user"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserDetail(params.id)
      .then((res) => {
        setUser(res)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleUpdateUser = async (values) => {
    const response = await updateUser(values, params.id)
    if (response.ok) {
      toast.success("User updated")
    }
  }

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <div>
      <h1>
        Update User: {user.firstName} {user.lastName}
      </h1>
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
        }}
        onSubmit={(values) => {
          handleUpdateUser(values) // Pass the values as an object with a "data" property
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="Jane" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <button type="submit">update</button>
        </Form>
      </Formik>
    </div>
  )
}
