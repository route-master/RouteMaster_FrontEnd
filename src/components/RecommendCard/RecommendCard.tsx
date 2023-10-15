import styles from './RecommendCard.module.css';

interface Props {
  title: string;
  imgsrc: string;
}

function RecommendCard({ title, imgsrc }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      {imgsrc ? (
        <img src={imgsrc} alt="" className={styles.img} />
      ) : (
        <div className={styles.black}> {} </div>
      )}
      <p className={styles.hidden_text}>{title}</p>
    </div>
  );
}

export default RecommendCard;
