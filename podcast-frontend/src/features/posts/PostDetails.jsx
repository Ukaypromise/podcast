import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants";

const PostDetails = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
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
            <p>{console.log(post)}</p>
          <p>{post.description}</p>
          <Link to="/">Back to all posts</Link>
        </>
      )}
    </div>
  );
};

export default PostDetails;
