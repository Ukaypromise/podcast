import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import Post from "./Post";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   async function fetchPosts() {
     try {
       const response = await fetch(`${API_URL}/posts`);
       if (response.ok) {
         const json = await response.json();
         setPosts(json);
       } else {
         setError("Something went wrong");
       }
     } catch (error) {
       setError(error.toString());
     } finally {
       setIsLoading(false);
     }
   }
    fetchPosts();
  }, []);
  return (
    <div>
      <h2>Posts</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
