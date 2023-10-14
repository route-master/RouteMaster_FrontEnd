/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
import styles from './ModalContent.module.css';

function LikeBtnModal(): JSX.Element {
  const addPlan = (planId: number) => {
    try {
      axios.post(`/plan/activity?username=testuser&planGroupId=${planId}`);
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e);
    }
  };

  const planList = Array.from({ length: 3 }, (_, i) => i + 1).map((i) => (
    <li key={i} onClick={() => addPlan(i)} className={styles.li}>
      Plan {i}
    </li>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>My Plans</h2>
        <ul className={styles.planlist}> {planList} </ul>
      </div>
    </div>
  );
}

export default LikeBtnModal;
