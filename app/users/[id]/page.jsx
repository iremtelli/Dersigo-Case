import Link from "next/link"
import { getUserDetail } from "../../../services/user"

import React from "react"

const UserDetailPage = async ({ params }) => {
  const response = await getUserDetail(params.id)

  return (
    <div className="flex flex-col items-center mt-5">
      <img
        src={response.picture}
        className="w-32 h-32 object-cover rounded-full mb-4"
      />
      <div className="bg-white shadow-md p-4 rounded-md mb-4 py-2">
        <h1 className="text-xl font-bold mb-2">
          {response.title} {response.firstName} {response.lastName}
        </h1>
        <p className="mb-1">
          <span className="font-semibold">Gender:</span> {response.gender}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Id:</span> {response.id}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Email:</span> {response.email}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Phone:</span> {response.phone}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Location:</span>{" "}
          {response.location.country}/{response.location.city}
        </p>
      </div>

      <Link
        href={`/users/${params.id}/posts`}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 inline-block"
      >
        User Posts
      </Link>
    </div>
  )
}

export default UserDetailPage
