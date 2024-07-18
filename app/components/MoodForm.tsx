"use client";

import { MoodDocument } from "@/app/models/Mood";
import { styled, TextareaAutosize } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useMoods, refreshMoods, submitMood } from "@/app/lib/moods";
import React from "react";
import Link from "next/link";

const PrettoSlider = styled(Slider)({
  color: "#60a5fa",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 28,
    height: 28,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#60a5fa",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const MoodForm = () => {
  const { data: session } = useSession();
  const [rating, setRating] = useState(50);
  const [remarks, setRemarks] = useState("");
  const [doEntry, setDoEntry] = useState(true);
  const { moods, isLoading, error } = useMoods();

  useEffect(() => {
    refreshMoods();
  }, [session?.user]);

  async function handleSubmit() {
    setDoEntry(false);
    const data = await submitMood({
      rating,
      remarks,
    });
  }

  const formContent = (
    <React.Fragment>
      <div className="w-full flex justify-between">
        <div>How are you feeling today?</div>
      </div>
      <div className="mt-2">
        <PrettoSlider
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={rating}
          onChangeCommitted={(e: any, v: any) => setRating(v)}
        />
      </div>
      <textarea
        rows={4}
        className="p-2.5 w-full text-sm text-gray-900 bg-pink-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Add a note if you're up for it"
        value={remarks}
        onChange={(e: any) => setRemarks(e.target.value)}
      />
      <button
        className="bg-blue-400 hover:bg-blue-500 mt-2 py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </React.Fragment>
  );

  const enterAnotherPrompt = (
    <React.Fragment>
      <div className="">
        You already entered a mood today! Would you like to enter another?
      </div>
      <div className="w-full flex">
        <button
          className="bg-blue-400 hover:bg-blue-500 mt-2 py-2 px-4 rounded"
          onClick={() => setDoEntry(true)}
        >
          Enter another
        </button>
      </div>
      <div className="mt-2">
        You can also go look at a timechart of your moods, or read your journal
        entries.
      </div>
      <div className="w-full flex">
        <Link
          className="bg-blue-400 hover:bg-blue-500 mt-2 mr-2 py-2 px-4 rounded"
          href="/graph"
        >
          Graph
        </Link>
        <Link
          className="bg-blue-400 hover:bg-blue-500 mt-2 py-2 px-4 rounded"
          href="/journal"
        >
          Journal
        </Link>
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <div className="w-full h-auto p-4 bg-pink-300 rounded-lg">
        {doEntry ? formContent : enterAnotherPrompt}
      </div>
    </div>
  );
};

export default MoodForm;
