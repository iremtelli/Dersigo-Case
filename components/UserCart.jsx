"use client"
import Link from "next/link"
import React from "react"

function UserCart({ data, deleteUser }) {
  return (
    <div className="bg-white shadow-md p-5 rounded-md mb-5 mx-5 flex items-center mt-5">
      <img
        src={data.picture}
        // alt={`${data.firstName} ${data.lastName}`}
        className="w-10 h-10 object-cover rounded-full mr-3"
      />
      <Link href={`users/${data.id}`} className="flex items-center">
        <h1 className="text-lg font-semibold  py-2">
          {data.title} {data.firstName} {data.lastName}
        </h1>
      </Link>
      <button
        className="bg-red-500 text-white px-2 py-1 rounded ml-auto hover:bg-red-600"
        onClick={() => deleteUser(data.id)}
      >
        Kullanıcıyı Sil
      </button>
      <Link
        href={`users/${data.id}/edit`}
        className="bg-blue-500 text-white px-2 py-1 rounded ml-2 hover:bg-blue-600"
      >
        Güncelle
      </Link>
    </div>
  )
}

export default UserCart
