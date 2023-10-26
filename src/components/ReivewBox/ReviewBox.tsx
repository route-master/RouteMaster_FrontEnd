import ReviewList from './ReviewList/ReviewList';
import ReviewForm from './ReviewForm/ReviewForm';
import styles from './ReviewBox.module.css';

function ReviewBox(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1>리뷰</h1>
      <ReviewForm userId="1" />
      <ReviewList />
    </div>
  );
}

export default ReviewBox;
