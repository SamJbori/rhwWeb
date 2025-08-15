import { cn } from "@/src/libs/utils";

type RadioButtonProps = React.InputHTMLAttributes<HTMLInputElement>;

const ColorPicker = ({ ...props }: RadioButtonProps & {}) => (
  <input
    type="radio"
    {...props}
    className={cn(
      "appearance-none w-13 checked:border-4 aspect-square rounded-full",
      props.className
    )}
  />
);

export default ColorPicker;
