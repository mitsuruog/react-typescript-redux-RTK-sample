import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import classnames from "classnames";

export type InputProps = {} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = (props: InputProps) => {
  const { ...rest } = props;

  const rootStyle = classnames("form-input rounded");

  return <input className={rootStyle} {...rest} />;
};
