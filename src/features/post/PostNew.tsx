import { useState } from "react";
import { toast } from "react-toastify";

import { useCreatePostMutation } from "../../shared/hooks";
import { Button } from "../../shared/components";
import { PostForm, PostFormType } from "./partials";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export const PostNew = () => {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [form, setForm] = useState<PostFormType>({ title: "", body: "" });

  const onFormChange = (values: PostFormType) => {
    setForm(values);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createPost(form).unwrap();
      setForm({ title: "", body: "" });
      toast.success("Post created successfully");
    } catch (error) {
      const { data = "error" } = error as FetchBaseQueryError;
      toast.error(JSON.stringify(data));
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h2 className="text-xl">Create a new post</h2>
      </header>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <PostForm initialValues={form} onFormChange={onFormChange} />
        <div>
          <Button type="submit" color="primary" disabled={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
