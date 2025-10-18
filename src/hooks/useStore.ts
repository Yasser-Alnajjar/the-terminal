"use client";

import { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { boundStore } from "../store/store";
import { StoreStates, StoreInitialValues } from "../store/state";

/**
 * Usage in Next.js
 *
 * @tutorial
 * https://docs.pmnd.rs/zustand/integrations/persisting-store-data#usage-in-next.js
 *
 * NextJS uses Server Side Rendering, and it will compare the rendered component on the server with the one rendered on client. But since you are using data from browser to change your component, the two renders will differ and Next will throw a warning at you.
 *
 * The errors usually are:
 *
 * Text content does not match server-rendered HTML
 * Hydration failed because the initial UI does not match what was rendered on the server
 * There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering
 * To solve these errors, create a custom hook so that Zustand waits a little before changing your components.
 * @example
 * import useStore from './useStore'
 * import { useBearStore } from './stores/useBearStore'
 *
 * const bears = useStore(useBearStore, (state) => state.bears)
 */
export const useStore = <F>(callback: (state: StoreStates) => F) => {
  const result = boundStore(useShallow<StoreStates, F>(callback)) as F;
  const [data, setData] = useState<F>(() => ({ ...StoreInitialValues } as F));

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
