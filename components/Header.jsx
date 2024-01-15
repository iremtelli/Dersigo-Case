import Link from "next/link"
import React from "react"

const Header = () => {
  return (
    <div>
      <Link href="/">User List</Link>
      <Link href="/posts">Post List</Link>
    </div>
  )
}

export default Header
