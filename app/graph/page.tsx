"use client";

import { useEffect, useState } from "react";
import { MoodDocument } from "../models/Mood";
import { useSession } from "next-auth/react";

const GraphPage = () => {
  const { data: session } = useSession();

  const [moods, setMoods] = useState<Array<MoodDocument>>([]);

  useEffect(() => {
    const fetchMoods = async () => {
      const response = await fetch(`/api/moods`);
      const data = await response.json();

      setMoods(data);
    };

    if (session?.user) fetchMoods();
  });

  const cards = moods
    .filter((item) => item.remarks && item.remarks !== "")
    .map((item) => (
      <div className="mt-2 w-full flex-center text-center p-4 bg-pink-300 rounded-lg">
        <div>{item.rating}</div>
        <div>{item.remarks}</div>
      </div>
    ));

  return <div>{cards}</div>;
};

export default GraphPage;
