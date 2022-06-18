import { useNavigate } from "react-router-dom";

import { useGetPostsQuery, useGetUserQuery } from "../../shared/hooks";
import { Button } from "../../shared/components";
import { PostListItem } from "./partials";

export const PostList = () => {
  const navigate = useNavigate();

  const { data: posts } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: user } = useGetUserQuery();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex justify-between">
        <div className="flex items-center">
          <h2 className="text-xl">Posts</h2>
        </div>
        <div className="flex items-center">
          {user && (
            <Button color="primary" onClick={() => navigate("/posts/new")}>
              Create a new post
            </Button>
          )}
        </div>
      </header>
      <ul>
        {posts?.list?.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};
