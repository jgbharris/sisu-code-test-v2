import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  percentage: number;
}

const Progressbar = ({ percentage }: ProgressBarProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.filler} style={{ width: `${percentage}%` }}>
        {`${percentage}%`}
      </div>
    </div>
  );
};

export default Progressbar;
