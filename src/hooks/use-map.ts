import { useRef } from "react";

export default function useMap<TKey extends object, TValue>() {
  const mapRef = useRef<Map<TKey, TValue>>(undefined);

  if (mapRef.current === undefined) {
    mapRef.current = new Map<TKey, TValue>();
  }
  
  return mapRef.current;
}
