import LikeButton from 'components/LikeButton/LikeButton';
import styles from './AttractionItem.module.css';

interface Props {
  id: number;
  title: string;
  thumb: string;
}

function AttractionItem({ id, thumb, title }: Props): JSX.Element {
  return (
    <li key={`li-${id}`} className={styles.container}>
      <div className={styles.thumb_container}>
        <img src={thumb} alt="" className={styles.thumb} />
        <div className={styles.likebtn}>
          <LikeButton />
        </div>
      </div>
      <div className={styles.info_container}>
        <h2>{title}</h2>
        <div className={styles.price_and_review}>
          <div>
            <h3>Price</h3>
            <h2>1000원 ~</h2>
          </div>
          <div>
            <h3>리뷰</h3>
            <h2>별점</h2>
          </div>
        </div>
      </div>
    </li>
  );
}

export default AttractionItem;
