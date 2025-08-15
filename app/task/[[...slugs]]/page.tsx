import { Suspense } from "react";
import AppTitle from "@c/AppTitle";
import TaskEditor from "@c/TaskEditpr";

// This page bundle will be created statically
export const dynamic = "force-static";

const TaskPage = ({}: PageProps<never, { slugs: string[] | undefined }>) => {
  return (
    <main>
      <AppTitle />
      <Suspense>
        <TaskEditor />
      </Suspense>
    </main>
  );
};

export default TaskPage;

type PageProps<
  K extends string = never,
  T extends Record<string, string | string[] | undefined> | undefined = {}
> = {
  params: Promise<T>;
  searchParams: [K] extends [never]
    ? undefined
    : Promise<Record<K, string | undefined>>;
};
