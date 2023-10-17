import React from "react";
import { useState, useEffect } from "react";
import { getAllPosts, deleteAPost } from "../../services/PostService";
import Post from "./Post";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   async function fetchPosts() {
     try {
        const posts = await getAllPosts();
        setPosts(posts);
     } catch (error) {
       setError(error.toString());
     } finally {
       setIsLoading(false);
     }
   }
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await deleteAPost(id);
      // setPosts(posts.filter((post) => post.id !== id));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      setError(error.toString());
    }
  }

  return (
    <div>
      <h2>Posts</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {posts.map((post) => (
        <Post key={post.id} post={post} deletePost={deletePost} />
      ))}
    </div>
  );
};

export default PostsList;
