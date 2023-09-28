import styles from './PlanInfoBox.module.css';

function PlanInfoBox(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1>Plan Title</h1>
      <p>
        작성자: <b>TestUser</b>
      </p>
    </div>
  );
}

export default PlanInfoBox;
