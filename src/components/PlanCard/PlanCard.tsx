import styles from './PlanCard.module.css';

interface Props {
  title: string;
  writer: string;
  participants: string[];
}

function PlanCard({ title, writer, participants }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <p>
        작성자:
        <b>{writer}</b>
      </p>
      <p>
        참여자:
        {participants.map((m, i) => {
          return i !== participants.length - 1 ? m.concat(', ') : m;
        })}
      </p>
    </div>
  );
}

export default PlanCard;
