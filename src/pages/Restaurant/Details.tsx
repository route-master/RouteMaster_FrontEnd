import RestaurantDetailCard from 'components/RestaurantCard/RestaurantDetailCard';
import MenuBox from 'components/MenuBox/MenuBox';
import Review from 'components/Reivew/Review';
import styles from './Details.module.css';

function Details(): JSX.Element {
  return (
    <div className={styles.container}>
      <RestaurantDetailCard />
      <MenuBox />
      <Review />
    </div>
  );
}

export default Details;
