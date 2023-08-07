import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";

export const getServerSideProps: GetServerSideProps<{
  tasks: Task[];
}> = async () => {
  const res = fetch(`${process.env.NEXT_ENV_BASE_URL}/api/tasks`);
  const tasks = (await (await res).json()) as Task[];
  return {
    props: {
      tasks: tasks,
    },
  };
};

export default function Home({
  tasks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <h1 className="text-6xl font-bold">Task</h1>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around gap-2 sm:w-full">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">{task.title}</h3>
              <p className="mt-4 text-xl">{task.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
