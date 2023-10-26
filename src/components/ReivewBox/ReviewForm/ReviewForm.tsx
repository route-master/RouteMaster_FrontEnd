/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { saveReview, getReviewByContentId } from 'store/Slices/reviews/thunks';
import Rating from 'components/Rating/Rating';
import styles from './ReviewForm.module.css';

interface Review {
  userId: string;
  contentId: string;
  reviewComment: string;
  imageUrl: string;
  rating: number;
}

function ReviewForm(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const profilesState = useAppSelector((state) => state.profile.profiles);

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image || !reviewText || !rating) {
      alert('별점과 리뷰를 모두 입력해주세요.');
      return;
    }

    // Create a new FormData object to send the image
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Upload the image and get the image URL
      if (id === undefined) return;

      if (isLogin === null || !profilesState[0]) {
        alert('로그인 전에는 리뷰를 쓸 수 없습니다. 로그인 후 이용해주세요.');
        return;
      }

      const currentUserId = profilesState[0].profile.id;
      const newReview: Review = {
        userId: currentUserId,
        contentId: id,
        reviewComment: reviewText,
        // imageUrl: uploadResponse.payload.imageUrl,
        imageUrl: '',
        rating,
      };

      // Dispatch an action to add the new review
      const res = dispatch(saveReview(newReview));
      if (res && (await res).type.endsWith('fulfilled')) {
        dispatch(getReviewByContentId({ contentId: id }));
      }

      // Clear the form
      setReviewText('');
      setRating(0);
      setImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <form onSubmit={handleReviewSubmit}>
      <div className={styles.container}>
        <h3> 리뷰 작성하기 </h3>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div>
              <Rating mysize="large" rating={rating} setRating={setRating} />
            </div>
            <div className={styles.textarea}>
              <textarea
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.right}>
            <div>
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.submitbtn}>
          <button type="submit">Submit Review</button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
