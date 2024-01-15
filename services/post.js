import toast from "react-hot-toast"

const appId = "659eea120a87a320c43e11c8"

export async function getPosts() {
  const res = await fetch("https://dummyapi.io/data/v1/post?limit=10", {
    cache: "no-store",
    method: "GET",
    headers: {
      "app-id": appId,
    },
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export async function getUserPosts(userId) {
  const res = await fetch(
    `https://dummyapi.io/data/v1/user/${userId}/post?limit=10`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        "app-id": appId,
      },
    }
  )

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export async function createPost(data) {
  const res = await fetch(`https://dummyapi.io/data/v1/post/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "app-id": appId,
    },
    body: JSON.stringify({
      text: data.text,
      image: data.image,
      tags: data.tags,
      likes: data.likes,
      owner: data.owner,
    }),
  })

  if (!res.ok) {
    toast.error("Failed to fetch")
  }

  return res
}
export async function getPostDetail(id) {
  const res = await fetch(`https://dummyapi.io/data/v1/post/${id}`, {
    method: "GET",
    headers: {
      "app-id": appId,
    },
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
export async function getPostsByTag(id) {
  const res = await fetch(`https://dummyapi.io/data/v1/tag/${id}/post`, {
    method: "GET",
    headers: {
      "app-id": appId,
    },
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
export async function updatePost(data, id) {
  const res = await fetch(`https://dummyapi.io/data/v1/post/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "app-id": appId,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    toast.error("Failed to fetch")
  }

  return res
}
