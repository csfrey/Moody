"use client";

import { Provider } from "hooks-for-redux";

export default function ReduxProvider(props: any) {
  return <Provider {...props}>{props.children}</Provider>;
}
