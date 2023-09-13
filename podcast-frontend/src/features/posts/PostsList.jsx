import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then((r) => r.json())
      .then((posts) => {
        setPosts(posts);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError("An error occurred. Awkward...");
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      <h2>Posts</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
