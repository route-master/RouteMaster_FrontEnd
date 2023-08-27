import styles from './RecommendCard.module.css';

interface Props {
  imgsrc: string;
}

function RecommendCard({ imgsrc }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <img src={imgsrc} alt="" className={styles.img} />
      <p className={styles.hidden_text}> #호텔 </p>
    </div>
  );
}

export default RecommendCard;
