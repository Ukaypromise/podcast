import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post, deletePost }) => {
  return (
    <div
      key={post.id}
      className="p-4 border border-gray-300 mb-5 rounded-lg shadow-md flex justify-between items-center"
    >
      <h3>
        <Link to={`/${post.id}`} className="text-blue-500 hover:underline">
          {post.title}
        </Link>
      </h3>
      <button
        onClick={() => deletePost(post.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Delete
      </button>
    </div>
  );
};

export default Post;
