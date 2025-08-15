import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { cn } from "@/src/libs/utils";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const StyledButton = (props: ButtonProps) => (
  <button
    {...props}
    className={cn(
      "bg-[#1E6F9F] rounded-lg p-4 text gap-2 flex justify-center items-center text-sm ",
      props.className
    )}
  />
);

export default StyledButton;
