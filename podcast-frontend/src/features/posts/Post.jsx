import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div key={post.id}>
      <h3>
        <Link to={`/${post.id}`}>{post.title}</Link>
      </h3>
      <p>{post.description}</p>
    </div>
  );
};

export default Post;
