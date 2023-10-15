import { useState } from 'react';
import EmptyHeart from 'assets/images/emptyheart.png';
import FullHeart from 'assets/images/fullheart.png';
import styles from './LikeButton.module.css';

function ActivityLikeButton(): JSX.Element {
  const [imgSrc, setImgSrc] = useState<string>(EmptyHeart);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImgSrc(imgSrc === EmptyHeart ? FullHeart : EmptyHeart);
  };

  return (
    <div className={styles.container}>
      <button type="button" className={styles.button} onClick={onClick}>
        <img alt="add" src={imgSrc} className={styles.img} />
      </button>
    </div>
  );
}

export default ActivityLikeButton;
