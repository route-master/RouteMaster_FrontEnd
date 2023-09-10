import styles from './ActivityCard.module.css';

interface Activity {
  planGroupId: number;
  title: string;
  startTime: number;
  endTime: number;
  type: string;
  imgsrc: string;
}

function ActivityCard(activity: Activity): JSX.Element {
  const { title, type, imgsrc } = activity;
  let borderColor: string;

  if (type === 'hotel') {
    borderColor = 'red';
  } else if (type === 'attraction') {
    borderColor = 'blue';
  } else {
    borderColor = 'purple';
  }

  return (
    <div
      className={styles.container}
      style={{ border: `1px solid ${borderColor}` }}
    >
      <img src={imgsrc} alt="" className={styles.img} />
      <h3>{title}</h3>
      <button className={styles.payment} type="button">
        정산하기
      </button>
    </div>
  );
}

export default ActivityCard;
