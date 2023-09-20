import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

const PostEditForm = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          description: post.description,
        }),
      });
      if (response.ok) {
        navigate(`/${id}`);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setError(error.toString());
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchCurrentPost() {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
          setIsLoading(false);
        } else {
          throw new Error("Something went wrong");
        }
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
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post-title">Title</label>
          <input
            type="text"
            id="post-title"
            name="title"
            value={post?.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="post-description">Description</label>
          <textarea
            id="post-description"
            name="description"
            value={post?.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default PostEditForm;
