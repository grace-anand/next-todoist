import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";

export const getServerSideProps: GetServerSideProps<{
  dummyJson: SampleJson[];
}> = async () => {
  const res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dummy-json`);
  const dummyJson = (await (await res).json()) as SampleJson[];
  return {
    props: {
      dummyJson: dummyJson,
    },
  };
};

const deleteTask = (id: string) => {
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dummy-json?id=${id}`, {
    method: "DELETE",
  })
    .then(() => {
      location.reload();
    })
    .catch((err) => {
      console.error(err);
    });
};

export default function Home({
  dummyJson,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <h1 className="text-6xl font-bold">Task</h1>
        <div className="mt-6">
          {dummyJson.map((sampleJson) => (
            <div
              className="relative m-5 rounded-md border border-blue-600 p-5"
              key={sampleJson.id}
            >
              <button
                className="absolute -right-3 -top-4 rounded-full border-2 border-gray-700 bg-white px-2 py-1 text-sm hover:bg-red-400"
                onClick={() => deleteTask(sampleJson.id)}
              >
                x
              </button>
              <p className="text-lg">{JSON.stringify(sampleJson)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
