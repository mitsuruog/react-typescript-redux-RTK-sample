import { useEffect, useState } from "react";

import { Button, Textarea } from "../../../shared/components";
import { Comment } from "../../../shared/models";
import { DateService } from "../../../shared/services";

export type CommentFormType = {
  body: string;
};

export type CommentListItemProps = {
  comment?: Comment;
  showTextarea?: boolean;
  canEdit?: boolean;
  disabied?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  onSubmit?: (body: string) => void;
};

export const CommentListItem = (props: CommentListItemProps) => {
  const { comment, disabied, showTextarea, canEdit } = props;

  const [form, setForm] = useState<CommentFormType>({ body: "" });

  const onFormChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    const values = { ...form, [`${name}`]: value };
    setForm(values);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof props.onSubmit === "function") {
      props.onSubmit(form.body);
    }
  };

  useEffect(() => {
    setForm({ body: comment?.body ?? "" });
  }, [comment]);

  return showTextarea ? (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Textarea
        id="body"
        name="body"
        value={form.body}
        onInput={onFormChange}
        required
      />
      <div className="flex gap-2">
        <Button color="secondary" onClick={props.onCancel} disabled={disabied}>
          Cancel
        </Button>
        <Button type="submit" color="primary" disabled={disabied}>
          Submit
        </Button>
      </div>
    </form>
  ) : (
    <div className="flex flex-col gap-4">
      <div>{comment?.body}</div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {canEdit && (
            <>
              <Button color="link" onClick={props.onEdit} disabled={disabied}>
                Edit
              </Button>
              <Button color="link" onClick={props.onDelete} disabled={disabied}>
                Delete
              </Button>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <div>{comment?.username}</div>
          <time dateTime={comment?.updated_at}>
            {DateService.formatDateTime(comment?.updated_at)}
          </time>
        </div>
      </div>
    </div>
  );
};
