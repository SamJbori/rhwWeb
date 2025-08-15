"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { taskCreate, taskEdit, taskGet } from "@/src/libs/api";

import Spinner from "./Spinner";
import ColorPicker from "./ColorPicker";

import type { OUTask } from "@/src/libs/task";

const TaskEditor = () => {
  const [isLoading, isLoadingSet] = useState(true);

  const { slugs } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState,
    reset,
    getValues,
    setValue,
    watch,
  } = useForm<OUTask>({});
  const selectedColor = watch("color");

  useEffect(() => {
    if (!slugs || !Array.isArray(slugs) || slugs.length < 1) {
      isLoadingSet(false);
      return;
    }
    void taskGet(slugs[0])
      .then(reset)
      .finally(() => isLoadingSet(false));
  }, [slugs]);
  const onSubmit = async (data: OUTask) => {
    console.log(data);
    try {
      if (data.id) {
        const { id, ...task } = data;
        await taskEdit(id, task);
      } else {
        await taskCreate(data);
      }
      router.push("/");
    } catch (e: any) {
      console.log(e);
    }
  };
  if (isLoading) {
    return (
      <div className="flex gap-3 justify-center pt-24 items-center">
        <p className="text-[#808080]">Loading Task</p>
        <Spinner />
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col justify-center items-center pt-[91px]"
    >
      <div className="w-[90vw] max-w-[46rem] flex flex-col gap-12 justify-between">
        <button onClick={() => router.back()}>
          <Image src={"/back.svg"} alt="←" width={14} height={14} unoptimized />
        </button>
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="font-bold text-[#4EA8DE]">Title</p>
            <input
              placeholder="Ex. Brush you teeth"
              type="text"
              {...register("title", { required: true })}
              className="w-full rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#262626]"
            />
          </div>
          <div className="space-y-3">
            <p className="font-bold text-[#4EA8DE]">Color</p>
            <div className="gap-4 flex">
              {colors.map((color, i) => (
                <ColorPicker
                  key={i}
                  value={color}
                  checked={selectedColor === color}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    // If clicking the already selected color, uncheck it
                    if (selectedColor === color) {
                      setValue("color", undefined);
                    } else {
                      setValue("color", color);
                    }
                  }}
                  onChange={() => {}} // Prevent default radio behavior
                />
              ))}
            </div>
          </div>
        </div>
        <button disabled={formState.isSubmitting} className="btn max-w-184">
          {<p>{getValues("id") ? "Save" : "Add Task"}</p>}
          {formState.isSubmitting ? (
            <Spinner light />
          ) : (
            <Image
              src={getValues("id") ? "/check.svg" : "/plus.svg"}
              alt="+"
              width={16}
              height={16}
              unoptimized
            />
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskEditor;

const colors = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#007AFF",
  "#5856D6",
  "#AF52DE",
  "#FF2D55",
  "#A2845E",
];
