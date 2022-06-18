import { NavLink } from "react-router-dom";

import { Post } from "../../../shared/models";
import { DateService } from "../../../shared/services";

export type PostListItemProps = {
  post: Post;
};

export const PostListItem = (props: PostListItemProps) => {
  const { post } = props;

  return (
    <li key={post.id} className="flex flex-col border-b py-4">
      <div>
        <h3>
          <NavLink
            to={`/posts/${post.id}`}
            className="text-lg underline text-blue-700"
          >
            {post.title}
          </NavLink>
        </h3>
      </div>
      <div className="flex justify-end">
        <div className="flex gap-2">
          <div>{post.username}</div>
          <time dateTime={post.updated_at}>
            {DateService.formatDateTime(post.updated_at)}
          </time>
        </div>
      </div>
    </li>
  );
};
