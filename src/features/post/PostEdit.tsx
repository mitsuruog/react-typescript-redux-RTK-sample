import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { useGetPostQuery, useUpdatePostMutation } from "../../shared/hooks";
import { Button } from "../../shared/components";
import { PostForm, PostFormType } from "./partials";

export const PostEdit = () => {
  const navigate = useNavigate();
  const params = useParams<{ postId: string }>();
  const postId = Number(params.postId);

  const { data: post } = useGetPostQuery(postId, {});
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const [form, setForm] = useState<PostFormType>({ title: "", body: "" });

  const onFormChange = (values: PostFormType) => {
    setForm(values);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePost({ ...form, id: postId }).unwrap();
      toast.success("Post updated successfully");
    } catch (error) {
      const { data = "error" } = error as FetchBaseQueryError;
      toast.error(JSON.stringify(data));
    }
  };

  useEffect(() => {
    setForm({
      title: post?.title ?? "",
      body: post?.body ?? "",
    });
  }, [post]);

  return (
    <div className="flex flex-col gap-8">
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <PostForm initialValues={form} onFormChange={onFormChange} />
        <div className="flex gap-4">
          <Button
            color="secondary"
            disabled={isLoading}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
