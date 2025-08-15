import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/libs/utils";

import type { OTask } from "@/src/libs/task";

type Prop = {
  isDisabled: boolean;
  onUpdate: (action: "delete" | boolean) => Promise<void>;
} & OTask;

const TaskEntry = ({ isDisabled, onUpdate, id, title, completed }: Prop) => (
  <div
    // Figma Says Gray 400, but the color code for Gray 400 is #9CA3AF,
    // I thought of customizing Tailwind but I don't usually recommend
    // that, and CSS was giving me some attitude so I used it directly
    className="flex p-4 bg-[#333333] rounded-lg w-full gap-2 items-start-safe shadow-[0px_2px_8px_0px_#0000000F]"
  >
    <label className="relative flex items-center cursor-pointer w-4 aspect-square">
      <input
        disabled={isDisabled}
        type="checkbox"
        checked={completed}
        onChange={(e) => {
          onUpdate(!completed);
        }}
        className={cn(
          "relative peer appearance-none w-6 aspect-square rounded-full border border-[#4EA8DE] checked:border-0 checked:bg-[#5E60CE] focus:outline-none cursor-pointer leading-[1.4]",
          isDisabled ? "border-gray-400" : undefined
        )}
      />
      <svg
        className="absolute w-4 aspect-square pointer-events-none opacity-0 peer-checked:opacity-100"
        // style={{ left: "1px", top: "1px" }}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </label>
    <Link href={`/task/${id}`} className="w-full">
      <p >{title}</p>
    </Link>
    <button
      disabled={isDisabled}
      onClick={() => {
        if (isDisabled) return;
        void onUpdate("delete");
      }}
      className="flex w-6 aspect-square justify-center items-center"
    >
      <Image src={"/trash.svg"} alt="🗑" width={13} height={14} />
    </button>
  </div>
);

export default TaskEntry;
