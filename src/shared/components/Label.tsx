import { DetailedHTMLProps, LabelHTMLAttributes } from "react";
import classnames from "classnames";

export type LabelProps = {
  text?: React.ReactNode;
  children: React.ReactNode;
} & DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

export const Label = (props: LabelProps) => {
  const { text, children, ...rest } = props;

  const rootStyle = classnames("");

  return (
    <label className={rootStyle} {...rest}>
      {text}
      {children}
    </label>
  );
};
