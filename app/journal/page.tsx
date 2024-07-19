"use client";

import { useEffect, useState } from "react";
import { MoodDocument } from "../models/Mood";
import { useSession } from "next-auth/react";
import { parseDateString } from "@/app/lib/utils";
import { getMoods } from "@/app/lib/moods";

import "./page.css";

const formatter = new Intl.DateTimeFormat();

const Card = ({ mood }: { mood: MoodDocument }) => {
  let { createdAt, rating, remarks } = mood;
  return (
    <div className="mt-2 w-full flex-center p-4 pb-6 bg-pink-300 rounded-lg">
      <div className="flex w-full justify-between pb-2">
        <div className="flex ">
          On&nbsp;
          <div>{parseDateString(createdAt)}</div>
          &nbsp;you said...
        </div>
        <div className="font-bold text-slate-50 rounded-full bg-pink-400 flex items-center justify-center w-10 h-10">
          {rating}
        </div>
      </div>
      <div className="speech-bubble p-2">{remarks}</div>
    </div>
  );
};

const GraphPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [moods, setMoods] = useState<Array<MoodDocument>>([]);

  useEffect(() => {
    if (session) {
      Promise.resolve()
        .then(() => setLoading(true))
        .then(getMoods)
        .then(setMoods)
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [session]);

  const cards = moods
    .filter((item) => item.remarks && item.remarks !== "")
    .map((mood, i) => <Card mood={mood} key={`mood-${i}`} />);

  return <div>{cards}</div>;
};

export default GraphPage;
