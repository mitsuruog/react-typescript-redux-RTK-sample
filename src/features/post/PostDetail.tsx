import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import {
  useGetPostQuery,
  useDeletePostMutation,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetUserQuery,
} from "../../shared/hooks";
import { DateService } from "../../shared/services";
import { Button } from "../../shared/components";
import { CommentListItem } from "./partials";

export const PostDetail = () => {
  const navigate = useNavigate();
  const params = useParams<{ postId: string }>();
  const postId = Number(params.postId);

  const [editComment, setEditComment] = useState<{
    open?: boolean;
    commenId?: number;
  }>({});

  const { data: post } = useGetPostQuery(postId);
  const { data: user } = useGetUserQuery();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const [createComment, { isLoading: isCommentCreating }] =
    useCreateCommentMutation();
  const [updateComment, { isLoading: isCommentUpdating }] =
    useUpdateCommentMutation();
  const [deleteComment, { isLoading: isCommentDeleteing }] =
    useDeleteCommentMutation();

  const commentSubmitting =
    isCommentCreating || isCommentUpdating || isCommentDeleteing;

  const onDelete = async () => {
    const ok = confirm("Are you sure delete this post?");
    if (ok) {
      try {
        await deletePost(postId).unwrap();
        toast.success("Post deleted successfully");
        navigate("/");
      } catch (error) {
        const { data = "error" } = error as FetchBaseQueryError;
        toast.error(JSON.stringify(data));
      }
    }
  };

  const onCreateComment = async (body: string) => {
    try {
      await createComment({ postId, body }).unwrap();
      toast.success("Comment created successfully");
      setEditComment({});
    } catch (error) {
      const { data = "error" } = error as FetchBaseQueryError;
      toast.error(JSON.stringify(data));
    }
  };

  const onCommentUpdate = async (commentId: number, body: string) => {
    try {
      await updateComment({ postId, commentId, body }).unwrap();
      toast.success("Comment updated successfully");
      setEditComment({});
    } catch (error) {
      const { data = "error" } = error as FetchBaseQueryError;
      toast.error(JSON.stringify(data));
    }
  };

  const onDeleteComment = async (commentId: number) => {
    const ok = confirm("Are you sure delete this comment?");
    if (ok) {
      try {
        await deleteComment({ postId, commentId }).unwrap();
        toast.success("Comment deleted successfully");
      } catch (error) {
        const { data = "error" } = error as FetchBaseQueryError;
        toast.error(JSON.stringify(data));
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-8 border-b py-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <h2 className="text-xl">{post?.title}</h2>
          </div>
          <div className="flex items-center">
            {user && (
              <Button color="primary" onClick={() => navigate("/posts/new")}>
                Create a new post
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <div>Created At</div>
            <time dateTime={post?.created_at}>
              {DateService.formatDateTime(post?.created_at)}
            </time>
          </div>
          <div className="flex gap-2">
            <div>Updated At</div>
            <time dateTime={post?.updated_at}>
              {DateService.formatDateTime(post?.updated_at)}
            </time>
          </div>
        </div>
      </header>
      <section className="whitespace-pre-wrap">{post?.body}</section>
      <footer className="flex justify-between items-center border-b">
        <div className="flex gap-2">
          {user && user.id === post?.user_id && (
            <>
              <Button
                color="link"
                onClick={() => navigate(`/posts/${postId}/edit`)}
                disabled={isDeleting}
              >
                Edit
              </Button>
              <Button color="link" onClick={onDelete} disabled={isDeleting}>
                Delete
              </Button>
            </>
          )}
        </div>
        <div>{post?.username}</div>
      </footer>
      <section className="flex flex-col">
        <ul className="flex flex-col gap-2 ml-8">
          {post?.comments.map((comment) => (
            <li key={comment.id} className="border-b pb-4">
              <CommentListItem
                comment={comment}
                canEdit={comment.user_id === user?.id}
                showTextarea={
                  editComment.open && editComment.commenId === comment.id
                }
                onEdit={() =>
                  setEditComment({ open: true, commenId: comment.id })
                }
                onCancel={() => setEditComment({})}
                onSubmit={(body) => onCommentUpdate(comment.id, body)}
                onDelete={() => onDeleteComment(comment.id)}
              />
            </li>
          ))}
          <li>
            {editComment.open && editComment.commenId === undefined ? (
              <CommentListItem
                showTextarea={true}
                onCancel={() => setEditComment({})}
                onSubmit={onCreateComment}
              />
            ) : (
              <Button
                color="link"
                onClick={() => setEditComment({ open: true })}
                disabled={commentSubmitting}
              >
                Add a new comment
              </Button>
            )}
          </li>
        </ul>
      </section>
    </div>
  );
};
