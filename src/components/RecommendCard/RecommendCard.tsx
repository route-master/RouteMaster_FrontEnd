import DefaultImg from 'assets/images/logo_black.png';
import styles from './RecommendCard.module.css';

interface Props {
  title: string;
  imgsrc: string;
}

function RecommendCard({ title, imgsrc }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <img src={imgsrc} alt={DefaultImg} className={styles.img} />
      <p className={styles.hidden_text}>{title}</p>
    </div>
  );
}

export default RecommendCard;
