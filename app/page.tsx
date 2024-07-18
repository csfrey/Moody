import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import MoodForm from "@/app/components/MoodForm";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <MoodForm />;
  }

  return (
    <article className="mt-6 w-full flex-center text-center p-4 bg-pink-300 rounded-lg">
      Moody is an app for tracking your mood. It works the best if you use it
      every day. View trends in you mood over time by clicking on the "graph"
      tag up top, or click on "journal" to read your past entries. Sign in to
      get started!
    </article>
  );
}
