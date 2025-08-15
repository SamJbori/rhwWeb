import { cn } from "@/src/libs/utils";

const Spinner = ({ light }: { light?: boolean }) => (
  <div
    className={cn(
      light ? undefined : "border-blue-500",
      "w-3 h-3 border border-t-transparent rounded-full animate-spin ",
      
    )}
  />
);

export default Spinner;
