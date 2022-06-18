import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import { apiSlice } from "../store/APISlice";
import { RootState, AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSeletor: TypedUseSelectorHook<RootState> = useSelector;

export const {
  useGetUserQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useSignInMutation,
  useSignOutMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = apiSlice;
