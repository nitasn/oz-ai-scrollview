import { useState } from "react";
import AiScrollView, { type AiScrollViewItem } from "../AiScrollView/AiScrollView";
import Button from "../Button/Button";
import useIdsGenerator from "../hooks/use-ids-generator";
import generateRandomSentence from "../utils/random-sentence-generator";
import styles from "./App.module.css";

const MAX_MESSAGES_TO_RENDER = 4;

export default function App() {
  const newId = useIdsGenerator();
  const [messages, setMessages] = useState<AiScrollViewItem[]>([]);

  const addMessage = () => {
    setMessages((messages) => {
      const newArray = messages.slice(-MAX_MESSAGES_TO_RENDER);
      newArray.push({ id: newId(), text: generateRandomSentence({ minWords: 3, maxWords: 33 }) });
      return newArray;
    });
  };

  return (
    <div className={styles.app}>
      <AiScrollView maxItemsToRender={MAX_MESSAGES_TO_RENDER} items={messages} />
      <Button onClick={addMessage}>Add a Shtut</Button>
    </div>
  );
}
