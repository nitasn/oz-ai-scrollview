import { useRef } from "react";

export default function useWeakMap<TKey extends object, TValue>() {
  const mapRef = useRef<WeakMap<TKey, TValue>>(undefined);

  if (mapRef.current === undefined) {
    mapRef.current = new WeakMap<TKey, TValue>();
  }

  return mapRef.current;
}
