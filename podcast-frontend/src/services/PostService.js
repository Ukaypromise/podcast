import { API_URL } from "../constants";

async function getAllPosts() {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function getAPost(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deleteAPost(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  if (response.status === 204) {
    return null;
  }
  return response.json();
}

async function createPost(postData) {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    // Does not need the headers
    // headers: {
    //   "content-type": "application/json",
    // },
    // Change this to postData
    // body: JSON.stringify(postData),
    body: postData,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function updatePost(id, post) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export { deleteAPost, getAPost, getAllPosts, createPost, updatePost };
