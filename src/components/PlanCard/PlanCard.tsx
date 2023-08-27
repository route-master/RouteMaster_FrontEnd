import styles from './PlanCard.module.css';

interface Props {
  title: string;
  creator: string;
  members: string[];
}

function PlanCard({ title, creator, members }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <p>
        작성자:
        <b>{creator}</b>
      </p>
      <p>
        참여자:
        {members.map((m, i) => {
          return i !== members.length - 1 ? m.concat(', ') : m;
        })}
      </p>
    </div>
  );
}

export default PlanCard;
