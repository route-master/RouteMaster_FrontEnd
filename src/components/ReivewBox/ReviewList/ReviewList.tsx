import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { getReviewByContentId } from 'store/Slices/reviews/thunks';
import { useEffect } from 'react';
import styles from './Review.module.css';

interface Props {
  contentId: string;
}

function Review(props: Props): JSX.Element {
  const { contentId } = props;

  const reviews = useAppSelector((state: RootState) => state.reviews.reviews);
  const loading = useAppSelector((state: RootState) => state.reviews.loading);
  const error = useAppSelector((state: RootState) => state.reviews.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getReviewByContentId({ contentId }));
  }, [dispatch]);

  if (loading === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Reviews</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {/* <p>Name: {review.name}</p> */}
            <p>Rating: {review.rating}</p>
            <p>Review: {review.reviewComment}</p>
            {/* <img src={review.image} alt={`Image for ${review.name}`} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Review;
