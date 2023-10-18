import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePost, getAPost } from "../../services/PostService";

const PostEditForm = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      title: post.title,
      description: post.description,
    };
    try {
      const response = await updatePost(id, updatedPost);
      navigate(`/${response.id}`);
    } catch (error) {
      setError(error.toString());
      console.log(error);
    }
  };

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

  if (!post) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="flex flex-col items-center  h-screen">
        <h2 className="text-3xl font-semibold mb-4 mt-8">Edit Post</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label
              htmlFor="post-title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="post-title"
              name="title"
              value={post?.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="post-description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="post-description"
              name="description"
              value={post?.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="8"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PostEditForm;
