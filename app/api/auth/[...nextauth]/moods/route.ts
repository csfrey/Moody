import { connectDB } from "@/app/lib/mongodb";
import Mood from "@/app/models/Mood";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await getSession();

    const moods = await Mood.find({ userEmail: session?.user?.email });

    return NextResponse.json(moods, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch moods!" },
      { status: 500 }
    );
  }
}
