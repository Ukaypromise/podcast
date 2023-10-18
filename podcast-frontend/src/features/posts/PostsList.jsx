import React from "react";
import { useState, useEffect } from "react";
import { getAllPosts, deleteAPost } from "../../services/PostService";
import Post from "./Post";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Post was deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      setError(error.toString());
      toast.error("Post was not deleted", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className=" mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">Posts</h2>
      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {posts.map((post) => (
        <Post key={post.id} post={post} deletePost={deletePost} />
      ))}
    </div>
  );
};

export default PostsList;
