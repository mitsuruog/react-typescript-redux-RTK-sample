import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { Post, APIListResponse, User } from "../models";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    credentials: "include",
  }),
  tagTypes: ["User", "Post", "Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<APIListResponse<Post>, void>({
      query: () => `/api/posts`,
      providesTags: ["Posts"],
    }),
    getPost: builder.query<Post, number>({
      query: (id: number) => `/api/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    getUser: builder.query<User | undefined, void>({
      async queryFn(arg, api, extraOptions, fetchWithBQ) {
        const result = await fetchWithBQ("/api/user");
        if (result.error) {
          return result.error.status === 401
            ? { data: undefined }
            : { error: result.error as FetchBaseQueryError };
        }
        return { data: result.data as User };
      },
      providesTags: ["User"],
    }),
    createPost: builder.mutation<Post, { title: string; body: string }>({
      query: (body) => ({
        url: "/api/posts",
        method: "post",
        body,
      }),
    }),
    updatePost: builder.mutation<
      Post,
      { id: number; title: string; body: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/api/posts/${id}`,
        method: "put",
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: "delete",
      }),
    }),
    createComment: builder.mutation<void, { postId: number; body: string }>({
      query: ({ body, postId }) => ({
        url: "/api/comments",
        method: "post",
        body: { body, post_id: postId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg.postId },
      ],
    }),
    updateComment: builder.mutation<
      void,
      { postId: number; commentId: number; body: string }
    >({
      query: ({ commentId, body }) => ({
        url: `/api/comments/${commentId}`,
        method: "put",
        body: { body },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg.postId },
      ],
    }),
    deleteComment: builder.mutation<
      void,
      { postId: number; commentId: number }
    >({
      query: ({ commentId }) => ({
        url: `/api/comments/${commentId}`,
        method: "delete",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg.postId },
      ],
    }),
    signIn: builder.mutation<User, { username: string; password: string }>({
      query: (body) => ({
        url: "/api/signin",
        method: "post",
        body,
      }),
      invalidatesTags: (result) => (result === undefined ? [] : ["User"]),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: "/api/signout",
        method: "post",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
