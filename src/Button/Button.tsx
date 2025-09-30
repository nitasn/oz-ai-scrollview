import styles from "./Button.module.css";

export type ShtutButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function Button({ onClick, children }: ShtutButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
