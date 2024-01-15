const appId = "659eea120a87a320c43e11c8"

export async function getUserListData() {
  const res = await fetch("https://dummyapi.io/data/v1/user?limit=10", {
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

export async function getUserDetail(id) {
  const res = await fetch(`https://dummyapi.io/data/v1/user/${id}`, {
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

export async function createUser(data) {
  const res = await fetch(`https://dummyapi.io/data/v1/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "app-id": appId,
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    }),
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${JSON.stringify(await res.json())}`)
  }

  return res
}

export async function updateUser(data, id) {
  const res = await fetch(`https://dummyapi.io/data/v1/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "app-id": appId,
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
    }),
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${JSON.stringify(await res.json())}`)
  }

  return res
}

export async function deleteUserService(id) {
  const res = await fetch(`https://dummyapi.io/data/v1/user/${id}`, {
    method: "DELETE",
    headers: {
      "app-id": appId,
    },
  })

  return res
}
