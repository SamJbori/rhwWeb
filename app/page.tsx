"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { taskDelete, taskEdit, tasksGet } from "@/src/libs/api";
import AppTitle from "@c/AppTitle";
import Spinner from "@c/Spinner";
import TaskEntry from "@c/TaskEntry";

import type { OTask } from "@/src/libs/task";

/**
 * I hate dynamic pages, unless it's a financial transaction or sensetive data,
 * in this case I am using it to show the dynamic scenario
 * @returns
 */
export default function Home() {
  const [trigger, triggerSet] = useState(0);
  const [tasks, tasksSet] = useState<OTask[]>([]);
  const [isLoading, isLoadingSet] = useState(false);
  useEffect(() => {
    isLoadingSet(true);
    tasksGet()
      .then(tasksSet)
      .finally(() => isLoadingSet(false));
  }, [trigger]);

  const updateTask = async (id: string, action: "delete" | boolean) => {
    isLoadingSet(true);
    switch (action) {
      case "delete":
        if (window.confirm("Are you sure you want to delete this task?")) {
          await taskDelete(id);
        }
        break;
      case true:
      case false:
        await taskEdit(id, { completed: action });
        break;
    }
    triggerSet((p) => ++p);
  };
  const finishedTasks = tasks.filter(({ completed }) => !!completed).length;

  return (
    <main className="flex flex-col justify-center items-center">
      <AppTitle />
      <div className="relative w-full flex flex-col justify-center items-center">
        <button disabled={isLoading} className="btn absolute max-w-[46rem]">
          <Link href={"/task"} className="flex gap-3 w-full justify-center ">
            <p>Create Task</p>
            <Image
              src={"/plus.svg"}
              alt="+"
              width={16}
              height={16}
              unoptimized
            />
          </Link>
        </button>
      </div>
      {/* Task View */}
      <div className="mt-24 flex flex-col items-center w-[90vw] max-w-[46rem] gap-6">
        {/* Status Bar */}
        <div className="w-full flex justify-between ">
          <p className="space-x-2">
            <span className="p-blue">Tasks</span>
            <span className="rounded-full counter p-0.5 px-2 text-xs">
              {tasks.length}
            </span>
          </p>
          <div className="space-x-2 flex items-center">
            {isLoading && <Spinner />}
            <p className="space-x-1.5">
              <span className="p-purpule">Completed</span>
              <span className="rounded-full counter p-0.5 px-2 text-xs">
                {tasks.length ? `${finishedTasks} of ${tasks.length}` : "0"}
              </span>
            </p>
          </div>
        </div>
        {/* Tasks List */}
        <div className="w-full flex justify-between py-2">
          {!!tasks.length ? (
            <div
              className={
                "w-full flex flex-col justify-center items-center gap-3 "
              }
            >
              {tasks.map((task) => (
                <TaskEntry
                  key={task.id}
                  isDisabled={isLoading}
                  onUpdate={(action) => updateTask(task.id, action)}
                  {...task}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-4 px-6 py-16 rounded-lg border-t border-[#333333]">
              <Image
                src={"clipboard.svg"}
                alt=""
                width={56}
                height={56}
                unoptimized
              />
              <p
                className="text-[#808080] flex flex-col items-center gap-6 text-base leading-[1.4] text-center tracking-[0] font-bold"
                content="You don't have any tasks registered yet. Create tasks and organize your to-do items."
              >
                You don't have any tasks registered yet.
                <span className="font-normal">
                  Create tasks and organize your to-do items
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
