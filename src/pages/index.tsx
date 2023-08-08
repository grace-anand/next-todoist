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
        <div className="mt-6">
          {tasks.map((task) => (
            <div
              className="m-5 rounded-md border border-blue-600 p-5"
              key={task.id}
            >
              <h3 className="text-lg">{task.title}</h3>
              <p className="mt-4 text-sm">{task.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
