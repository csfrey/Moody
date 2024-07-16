import Image from "next/image";

export default function Home() {
  return (
    <section className="mt-6 w-full flex-center text-center p-4 bg-pink-300 rounded-lg">
      Moody is an app for tracking your mood. It works the best if you use it
      every day. View trends in you mood over time by clicking on the "graph"
      tag up top, or click on "journal" to read your past entries. Log in to get
      started!
    </section>
  );
}
