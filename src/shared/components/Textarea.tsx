import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import classnames from "classnames";

export type TextareaProps = {} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const Textarea = (props: TextareaProps) => {
  const { className, ...rest } = props;

  const rootStyle = classnames("form-input rounded", {
    [`${className}`]: Boolean(className),
  });

  return <textarea className={rootStyle} {...rest} />;
};
