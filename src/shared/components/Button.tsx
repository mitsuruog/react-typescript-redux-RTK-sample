import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import classnames from "classnames";

export type ButtonProps = {
  color?: "primary" | "secondary" | "link" | "danger";
  children?: React.ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = (props: ButtonProps) => {
  const {
    type = "button",
    color = "secondary",
    disabled,
    children,
    ...rest
  } = props;

  const rootStyle = classnames("font-bold py-2 px-4 rounded", {
    ["bg-blue-500 hover:bg-blue-700 text-white"]: color === "primary",
    ["bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500"]:
      color === "secondary",
    ["bg-red-500 hover:bg-red-700 text-white"]: color === "danger",
    ["text-blue-700 underline"]: color === "link",
    ["opacity-50 cursor-not-allowed"]: Boolean(disabled),
  });

  return (
    <button className={rootStyle} type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
