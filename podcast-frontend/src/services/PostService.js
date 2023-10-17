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
  return response.json();
}

export { deleteAPost, getAPost, getAllPosts };
