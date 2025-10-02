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

/**
 * If `items.length` is `maxItemsToRender + 1`, the oldest item will be faded out.
 */
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

    // transistion duration depends on the height of the new item
    const translateTransistionConfig: KeyframeAnimationOptions = {
      duration: elementHeights[items.length - 1] * 3 + 250,
      easing: "ease",
      fill: "forwards",
    };

    requestAnimationFrame(() => {
      // set final positions (last item at bottom) with a transition
      let accumHeight = 0;
      for (let i = items.length - 1; i >= 0; i--) {
        domElements[i].animate([{ bottom: `${accumHeight}px` }], translateTransistionConfig);
        accumHeight += elementHeights[i];
      }

      // if one excess item, fade it out
      if (items.length === maxItemsToRender + 1) {
        domElements[0].animate([{ opacity: 0 }], fadeoutTransitionConfig);
      }
    });
  }, [items]);

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div
          ref={(domElement) => {
            if (domElement !== null) {
              itemRefs.set(item, domElement);
            } else {
              itemRefs.delete(item);
            }
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

const fadeoutTransitionConfig: KeyframeAnimationOptions = {
  duration: 500,
  easing: "ease-in-out",
  fill: "forwards",
};
