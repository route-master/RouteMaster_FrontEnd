import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getReviewByContentId } from 'store/Slices/reviews/thunks';

import LikeButton from 'components/LikeButton/PlanLikeButton/LikeButton';
import Rating from 'components/Rating/Rating';
import styles from './AttractionItem.module.css';

interface Props {
  contentId: number;
  title: string;
  thumb: string;
}

function AttractionItem({ contentId, thumb, title }: Props): JSX.Element {
  const [rate, setRate] = useState(0);
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews.reviews);

  useEffect(() => {
    dispatch(getReviewByContentId({ contentId: contentId.toString() }));
    const average: number = reviews.reduce(
      (acc, review) => acc + review.rating,
      // eslint-disable-next-line prettier/prettier
      0
    );

    if (reviews.length === 0) setRate(0);
    else setRate(average / reviews.length);
  }, []);

  return (
    <li key={contentId} className={styles.container}>
      <div className={styles.thumb_container}>
        <img src={thumb} alt="" className={styles.thumb} />
        <div className={styles.likebtn}>
          <LikeButton contentId={contentId} />
        </div>
      </div>
      <div className={styles.info_container}>
        <h2>{title}</h2>
        <div className={styles.price_and_review}>
          <div>
            <h3>총 별점: {rate}</h3>
            <Rating isReadOnly mysize="large" rating={Math.round(rate)} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default AttractionItem;
