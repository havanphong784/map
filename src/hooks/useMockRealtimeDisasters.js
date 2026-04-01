import {useEffect, useRef} from "react";
import {generateMockDisaster} from "../data/mockDisasters";

export const useMockRealtimeDisasters = (enabled, onNewDisaster) => {
  const callbackRef = useRef(onNewDisaster);

  useEffect(() => {
    callbackRef.current = onNewDisaster;
  }, [onNewDisaster]);

  useEffect(() => {
    if (!enabled) return undefined;

    const intervalId = window.setInterval(() => {
      const nextDisaster = generateMockDisaster();
      callbackRef.current(nextDisaster);
    }, 15000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [enabled]);
};
