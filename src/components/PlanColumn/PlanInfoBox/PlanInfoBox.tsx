import { Link, useParams } from 'react-router-dom';
import styles from './PlanInfoBox.module.css';

function PlanInfoBox(): JSX.Element {
  const planGroupId = useParams<{ planGroupId: string }>();
  return (
    <div className={styles.container}>
      <h1>Plan Title</h1>
      <p>
        작성자: <b>TestUser</b>
      </p>
      <Link to={`/calculate/${planGroupId}`}>
        <button type="button" className={styles.calculation_btn}>
          여행 정산하기
        </button>
      </Link>
    </div>
  );
}

export default PlanInfoBox;
