import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";

export const getServerSideProps: GetServerSideProps<{
  tasks: Task[];
}> = async () => {
  const res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`);
  const tasks = (await (await res).json()) as Task[];
  return {
    props: {
      tasks: tasks,
    },
  };
};

const deleteTask = (id: string) => async () => {
  try {
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${id}`);
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks?id=${id}`, {
      method: "DELETE",
    });
    location.reload();
  } catch (err) {
    console.error(err);
  }
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
              className="relative m-5 rounded-md border border-blue-600 p-5"
              key={task.id}
            >
              <span
                className="absolute -right-3 -top-4 rounded-full border-2 border-gray-700 bg-white px-2 py-1 text-sm hover:bg-red-400"
                onClick={() => deleteTask(task.id)}
              >
                x
              </span>
              <h3 className="text-lg">{task.title}</h3>
              <p className="mt-4 text-sm">{task.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
