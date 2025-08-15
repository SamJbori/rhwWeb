import { env } from "@/env";
import { ONTask, OTask } from "./task";

export const taskGet = async (id: string) =>
  await fetch(`${env.NEXT_PUBLIC_API_EP}/task/${id}`, {
    next: { revalidate: 3, tags: ["task"] }, // I hate constant refreshers
    method: "GET",
    headers: { "x-nooro-token": env.NEXT_PUBLIC_AUTH_TOKEN },
  })
    .then(async (r) => {
      if (!r.ok) {
        throw new Error(`HTTP error! Status: ${r.status}`);
      }
      return (await r.json()) as OTask;
    })
    .catch((e) => {
      console.log(e);
    });

export const tasksGet = async () =>
  await fetch(`${env.NEXT_PUBLIC_API_EP}/task`, {
    next: { revalidate: 3, tags: ["task"] }, // I hate constant refreshers
    method: "GET",
    headers: { "x-nooro-token": env.NEXT_PUBLIC_AUTH_TOKEN },
  })
    .then(async (r) => {
      if (!r.ok) {
        throw new Error(`HTTP error! Status: ${r.status}`);
      }
      return (await r.json()) as OTask[];
    })
    .catch((e) => {
      console.log(e);
      return [];
    });

export const taskDelete = async (id: string) =>
  await fetch(`${env.NEXT_PUBLIC_API_EP}/task/${id}`, {
    method: "DELETE",
    headers: { "x-nooro-token": env.NEXT_PUBLIC_AUTH_TOKEN },
  })
    .then(async (r) => {
      if (!r.ok) {
        throw new Error(`HTTP error! Status: ${r.status}`);
      }
      return true;
    })
    .catch((e) => console.log(e));

export const taskEdit = async (id: string, task: Partial<ONTask>) => {
  // No News is an Ignored News!
  if (Object.keys(task).length < 1) return true;

  return await fetch(`${env.NEXT_PUBLIC_API_EP}/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-nooro-token": env.NEXT_PUBLIC_AUTH_TOKEN,
    },
    body: JSON.stringify(task),
  })
    .then(async (r) => {
      if (!r.ok) {
        throw new Error(`HTTP error! Status: ${r.status}`);
      }
      return true;
    })
    .catch((e) => console.log(e));
};

export const taskCreate = async (task: ONTask) =>
  await fetch(`${env.NEXT_PUBLIC_API_EP}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-nooro-token": env.NEXT_PUBLIC_AUTH_TOKEN,
    },
    body: JSON.stringify(task),
  })
    .then(async (r) => {
      if (!r.ok) {
        throw new Error(`HTTP error! Status: ${r.status}`);
      }
      return true;
    })
    .catch((e) => console.log(e));
