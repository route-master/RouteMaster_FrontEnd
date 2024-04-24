import { Link } from 'react-router-dom';
import styles from './RestaurantCard.module.css';

function RestaurantCard(): JSX.Element {
  return (
    <Link to="/restaurant/details/1234567" className={styles.wrap}>
      <div className={styles.image_card}>
        <img
          src="https://media-cdn.tripadvisor.com/media/photo-s/0c/50/18/dc/20160730-144342-largejpg.jpg"
          alt="image7777"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.rate}>4.4</div>
        <div className={styles.name}>asdf</div>
        <div className={styles.location}>asdf</div>
        <div className={styles.description}>asdf</div>
      </div>
    </Link>
  );
}

export default RestaurantCard;
