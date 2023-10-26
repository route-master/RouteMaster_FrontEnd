import ReviewComponent from './ReviewList/ReviewList';
import ReviewForm from './ReviewForm/ReviewForm';
import styles from './ReviewBox.module.css'

function ReviewBox(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1>리뷰</h1>
      <ReviewForm userId="1" />
      <ReviewComponent contentId="1" />
    </div>
  );
}

export default ReviewBox;
