"use client"
import Link from "next/link"
import React from "react"

function UserCart({ data, deleteUser }) {
  return (
    <>
      <Link href={`users/${data.id}`}>
        <h1>
          {data.firstName} {data.lastName}
        </h1>
        <img src={data.picture} alt={`${data.firstName} ${data.lastName}`} />
      </Link>
      <button onClick={() => deleteUser(data.id)}>Kullanıcıyı sil</button>
      <Link href={`users/${data.id}/edit`}>Güncelle</Link>
    </>
  )
}

export default UserCart
