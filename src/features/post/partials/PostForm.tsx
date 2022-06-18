import { useEffect, useState } from "react";
import { Input, Label, Textarea } from "../../../shared/components";

export type PostFormType = {
  title: string;
  body: string;
};

export type PostFormProps = {
  initialValues: PostFormType;
  onFormChange: (values: PostFormType) => void;
};

export const PostForm = (props: PostFormProps) => {
  const [form, setForm] = useState<PostFormType>(props.initialValues);

  const onFormChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    const values = { ...form, [`${name}`]: value };
    setForm(values);
  };

  useEffect(() => {
    props.onFormChange(form);
  }, [form]);

  useEffect(() => {
    setForm(props.initialValues);
  }, [props.initialValues]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Title</Label>
        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={onFormChange}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Body</Label>
        <Textarea
          id="body"
          name="body"
          value={form.body}
          onInput={onFormChange}
          required
          className="h-64"
        />
      </div>
    </div>
  );
};
