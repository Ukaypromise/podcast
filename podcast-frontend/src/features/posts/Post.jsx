import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post, deletePost }) => {
  return (
    <div key={post.id}>
      <h3>
        <Link to={`/${post.id}`}>{post.title}</Link>
      </h3>
      <button onClick={() => deletePost(post.id)}>Delete</button>
    </div>
  );
};

export default Post;
