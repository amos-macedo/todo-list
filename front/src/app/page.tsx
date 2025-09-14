import { Layout } from "@/components/layout";
import { TaskList } from "@/components/task-list";

export default function Home() {
  return (
    // <div className="bg-slate-800 flex items-center justify-center w-screen h-screen">
    <Layout>
      <TaskList />
    </Layout>

    // </div>
  );
}
