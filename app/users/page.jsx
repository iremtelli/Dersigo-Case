"use client"
import React, { useEffect, useState } from "react"

import Link from "next/link"
import { deleteUserService, getUserListData } from "@/services/user"
import UserCart from "@/components/UserCart"

export default function UserListPage() {
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    getUserList()
  }, [])

  const getUserList = async () => {
    const response = await getUserListData()
    setUserData(response?.data)
  }

  const deleteUser = async (userId) => {
    const response = await deleteUserService(userId)
    if (response.ok) {
      getUserList()
    }
  }

  return (
    <div>
      {userData && userData.length > 0 ? (
        <div>
          <h2>User List</h2>
          <Link href="users/create">Create new user</Link>
          {userData.map((user) => (
            <UserCart key={user.id} data={user} deleteUser={deleteUser} />
          ))}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  )
}
