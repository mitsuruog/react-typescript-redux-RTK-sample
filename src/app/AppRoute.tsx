import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { PostList } from "../features";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
    </Routes>
  );
};
