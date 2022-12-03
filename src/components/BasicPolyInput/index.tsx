import cn from "classnames";
import { ComponentProps, ElementType } from "react";

type InputOwnProps<E extends ElementType = ElementType> = {
  children?: string;
  primary?: boolean;
  secondary?: boolean;
  as?: E;
};

type InputProps<E extends ElementType> = InputOwnProps<E> &
  Omit<ComponentProps<E>, keyof InputOwnProps>;

const defaultElement = "input";

export const BasicPolyInput = <E extends ElementType = typeof defaultElement>({
  children,
  primary,
  secondary,
  as,
  ...otherProps
}: InputProps<E>) => {
  const classes = cn({ primary, secondary });
  const TagName = as || defaultElement;

  return (
    <TagName className={classes} {...otherProps}>
      {children}
    </TagName>
  );
}