import { MoodDocument } from "@/app/models/Mood";
import axios from "axios";
import { createReduxModule } from "hooks-for-redux";

export type MoodStore = {
  moods: Array<MoodDocument>;
  isLoading: boolean;
  error: any;
};

const defaultState: MoodStore = {
  moods: [],
  isLoading: false,
  error: null,
};

export const [
  useMoods,
  { setMoods, startLoading, stopLoading, setError },
  store,
] = createReduxModule("moods", defaultState, {
  setMoods: (state, moods: Array<MoodDocument>) =>
    Object.assign(state, { moods }),
  startLoading: (state) => Object.assign(state, { isLoading: true }),
  stopLoading: (state) => Object.assign(state, { isLoading: false }),
  setError: (state, error: any) => Object.assign(state, { error }),
});

export async function refreshMoods() {
  Promise.resolve()
    .then(startLoading)
    .then(getMoods)
    .then(setMoods)
    .catch(setError)
    .finally(stopLoading);
}

export async function getMoods() {
  try {
    const response = await axios.get("/api/moods");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function submitMood(data: { rating: number; remarks: string }) {
  try {
    const response = await axios.post("/api/moods", data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
