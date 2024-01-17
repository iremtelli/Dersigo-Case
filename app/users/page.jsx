"use client"
import React, { useEffect, useState } from "react"
import LoadingSpin from "../../components/Loading"
import Link from "next/link"
import { deleteUserService, getUserListData } from "../../services/user"
import UserCart from "../../components/UserCart"

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
    <div className="text-center">
      {userData && userData.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">User List</h2>
          <Link
            href="users/create"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create new user
          </Link>
          {userData.map((user) => (
            <UserCart key={user.id} data={user} deleteUser={deleteUser} />
          ))}
        </div>
      ) : (
        <LoadingSpin />
      )}
    </div>
  )
}
