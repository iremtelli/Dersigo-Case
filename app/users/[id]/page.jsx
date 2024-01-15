import Link from "next/link"
import { getUserDetail } from "../../../services/user"

import React from "react"

const UserDetailPage = async ({ params }) => {
  const response = await getUserDetail(params.id)

  return (
    <div>
      <h1>
        {response.title} {response.firstName} {response.lastName}
      </h1>
      <img src={response.picture} />
      <p>Email:{response.email}</p>
      <p>Phone:{response.phone}</p>
      <p>Location:{response.location.country}</p>
      <Link href={`/users/${params.id}/posts`}>User Posts</Link>
    </div>
  )
}

export default UserDetailPage
