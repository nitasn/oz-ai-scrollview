import styles from "./AiScrollView.module.css";

export type AiScrollViewItem = {
  id: number;
  text: string;
};

export type AiScrollViewProps = {
  items?: AiScrollViewItem[];
  maxItemsToRender?: number;
};

export default function AiScrollView({ items, maxItemsToRender }: AiScrollViewProps) {
  return (
    <div className={styles.container}>
      {items?.map((item) => (
        <div key={item.id} className={styles.item}>
          <strong>{item.id}</strong>: {item.text}
        </div>
      ))}
    </div>
  );
}
