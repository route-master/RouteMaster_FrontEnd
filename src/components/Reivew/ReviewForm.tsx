import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { saveReview } from '../../store/Slices/reviews/thunks';

interface Review {
  userId: string;
  contentId: string;
  reviewComment: string;
  imageUrl: string;
  rating: number;
}

interface Props {
  contentId: string;
  userId: string;
}

function ReviewForm(props: Props): JSX.Element {
  const { contentId, userId } = props;

  const dispatch = useAppDispatch();

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

    if (!image || !reviewText) {
      return;
    }

    // Create a new FormData object to send the image
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Upload the image and get the image URL
      // const uploadResponse = await dispatch();

      // Create a new review object with text, rating, and image URL
      const newReview: Review = {
        userId,
        contentId,
        reviewComment: reviewText,
        // imageUrl: uploadResponse.payload.imageUrl,
        imageUrl: '',
        rating,
      };

      // Dispatch an action to add the new review
      dispatch(saveReview(newReview));

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
      <div>
        <label htmlFor="reviewText">Review Text:</label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div>
        <button type="submit">Submit Review</button>
      </div>
    </form>
  );
}

export default ReviewForm;
