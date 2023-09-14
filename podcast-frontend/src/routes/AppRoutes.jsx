import React from "react";
import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostsList";

import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="posts/:id" element={<PostDetails />} />
    </Routes>
  );
};

export default AppRoutes;
