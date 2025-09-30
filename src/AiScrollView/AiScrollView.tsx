import { useLayoutEffect } from "react";
import useMap from "../hooks/use-map";
import styles from "./AiScrollView.module.css";

export type AiScrollViewItem = {
  id: number;
  text: string;
};

export type AiScrollViewProps = {
  items: AiScrollViewItem[];
  maxItemsToRender: number;
};

export default function AiScrollView({ items, maxItemsToRender }: AiScrollViewProps) {
  const itemRefs = useMap<AiScrollViewItem, HTMLDivElement>();

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const domElements = items.map((item) => itemRefs.get(item)!);
    const elementHeights = domElements.map((el) => el.getBoundingClientRect().height);

    // set initial positions (last item just below the bottom) immediately
    let accumHeight = -elementHeights[elementHeights.length - 1];
    for (let i = items.length - 1; i >= 0; i--) {
      domElements[i].style.bottom = `${accumHeight}px`;
      accumHeight += elementHeights[i];
    }

    requestAnimationFrame(() => {
      // set final positions (last item at bottom) with a transition
      let accumHeight = 0;
      for (let i = items.length - 1; i >= 0; i--) {
        domElements[i].animate([{ bottom: `${accumHeight}px` }], translateTransitionConfig);
        accumHeight += elementHeights[i];
      }

      // fade out any excess items
      if (items.length > maxItemsToRender) {
        for (let i = 0; i < items.length - maxItemsToRender; i++) {
          domElements[i].animate([{ opacity: 0 }], opacityTransitionConfig);
        }
      }
    });
  }, [items]);

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div
          ref={(domElement) => {
            domElement !== null ? itemRefs.set(item, domElement) : itemRefs.delete(item);
          }}
          key={item.id}
          className={styles.item}
        >
          <strong>{item.id}</strong>: {item.text}
        </div>
      ))}
    </div>
  );
}

const translateTransitionConfig: KeyframeAnimationOptions = {
  duration: 600,
  easing: "ease",
  fill: "forwards",
};

const opacityTransitionConfig: KeyframeAnimationOptions = {
  duration: 500,
  easing: "ease-in-out",
  fill: "forwards",
};
