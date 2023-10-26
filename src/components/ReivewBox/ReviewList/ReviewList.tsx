import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { getReviewByContentId } from 'store/Slices/reviews/thunks';

import Rating from 'components/Rating/Rating';
import styles from './ReviewList.module.css';

function ReviewList(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const reviews = useAppSelector((state: RootState) => state.reviews.reviews);
  const loading = useAppSelector((state: RootState) => state.reviews.loading);
  const error = useAppSelector((state: RootState) => state.reviews.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getReviewByContentId({ contentId: id }));
  }, [dispatch]);

  if (loading === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className={styles.noreview}>
        리뷰가 아직 없습니다. 리뷰를 작성해 경험을 공유해보세요!
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3>리뷰 목록</h3>
      <ul className={styles.ul}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.li}>
            {/* <p>Name: {review.name}</p> */}
            <Rating isReadOnly mysize="small" rating={review.rating} />
            <p className={styles.comment}>{review.reviewComment}</p>
            {/* <img src={review.image} alt={`Image for ${review.name}`} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
