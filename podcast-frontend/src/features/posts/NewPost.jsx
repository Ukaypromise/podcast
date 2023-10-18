import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/PostService";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      description,
    };
    try {
      const response = await createPost(newPost);
      navigate(`/${response.id}`);
    } catch (error) {
      console.error("Failed to create post: ",error);
    }
  };

  return (
    <div>
      <h2>Create a new Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
