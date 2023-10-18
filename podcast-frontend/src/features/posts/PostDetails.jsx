import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAllPosts, deleteAPost, getAPost } from "../../services/PostService";

const PostDetails = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  useEffect(() => {
    async function fetchCurrentPost() {
      try {
        const post = await getAPost(id);
        setPost(post);
        setIsLoading(false);
      } catch (error) {
        setError(error.toString());
        console.log(error);
      }
    }
    fetchCurrentPost();
  }, [id]);

  const deletePost = async () => {
    try {
      await deleteAPost(id);
      navigate("/");
    } catch (error) {
      setError(error.toString());
      console.error("Failed to delete post", error);
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="max-w-md mx-auto mt-32 p-4 border border-gray-300 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-semibold mb-4">Post Details</h2>
      {error && <p className="text-red-500">{error}</p>}
      {post && (
        <>
          <h3 className="text-xl font-semibold mt-4">{post.title}</h3>
          <p className="text-gray-700 mt-2">{post.description}</p>
          <div className="mt-4">
            <Link to="/" className="text-blue-500 hover:underline">
              Back
            </Link>
            <span className="mx-2 text-gray-500">|</span>
            <Link to={`/${id}/edit`} className="text-blue-500 hover:underline">
              Edit Post
            </Link>
            <span className="mx-2 text-gray-500">|</span>
            <button
              onClick={deletePost}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetails;
