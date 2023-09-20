import React from "react";
import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostDetails";
import NewPost from "../features/posts/NewPost";

import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="/:id" element={<PostDetails />} />
      <Route path="/new" element={<NewPost />} />
    </Routes>
  );
};

export default AppRoutes;
