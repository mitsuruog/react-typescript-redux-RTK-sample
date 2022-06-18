import { Routes, Route } from "react-router-dom";

import { PostList, PostDetail, PostNew, PostEdit } from "../features";
import { SignIn } from "../features/auth";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/new" element={<PostNew />} />
      <Route path="/posts/:postId/edit" element={<PostEdit />} />
      <Route path="/posts/:postId" element={<PostDetail />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};
