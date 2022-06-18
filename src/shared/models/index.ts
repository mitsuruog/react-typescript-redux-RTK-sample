export type APIListResponse<T> = {
  list: T[];
  count: number;
};

export type PostList = {
  id: number;
  title: string;
  body: string;
  user_id: number;
  username: string;
  created_at?: string;
  updated_at?: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  comments: Comment[];
  user_id: number;
  username: string;
  created_at?: string;
  updated_at?: string;
};

export type User = {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type Comment = {
  id: number;
  post_id: number;
  body: string;
  user_id: number;
  username: string;
  created_at?: string;
  updated_at?: string;
};
