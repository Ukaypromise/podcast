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
    <div>
      <h2>Post Details</h2>
      {error && <p>{error}</p>}
      {post && (
        <>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <Link to="/">Back</Link>
          {" | "}
          <Link to={`/${id}/edit`}>Edit Post</Link>
          {" | "}
          <button onClick={deletePost}>Delete</button>
        </>
      )}
    </div>
  );
};

export default PostDetails;
