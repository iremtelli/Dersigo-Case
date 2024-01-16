import Link from "next/link"
import React from "react"

const Header = () => {
  return (
    <div className="flex justify-center items-center space-x-4 bg-gray-200 p-4">
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded">
        User List
      </Link>
      <Link href="/posts" className="bg-green-500 text-white px-4 py-2 rounded">
        Post List
      </Link>
    </div>
  )
}

export default Header
