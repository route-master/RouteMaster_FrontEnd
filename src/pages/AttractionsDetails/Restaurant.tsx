import SearchBar from 'components/SearchBar/SearchBar';
import RestaurantCard from 'components/RestaurantCard/RestaurantCard';
import style from './Restaurant.module.css';

function RestaurantReview(): JSX.Element {
  return (
    <div className={style.container}>
      <SearchBar />
      <div className={style.wrap}>
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </div>
    </div>
  );
}

export default RestaurantReview;
