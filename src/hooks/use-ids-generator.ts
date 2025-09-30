import { useRef } from "react";

export default function useIdsGenerator() {
  const idRef = useRef(0);
  return () => ++idRef.current;
}
