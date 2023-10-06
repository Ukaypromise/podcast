import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants";

const PostDetails = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
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

  const deletePost = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setError(error.toString());
      console.log(error);
    }
  }

  if(isLoading) {
    return <p>Loading...</p>
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
          <button onClick={deletePost} >Delete</button>
        </>
      )}
    </div>
  );
};

export default PostDetails;
