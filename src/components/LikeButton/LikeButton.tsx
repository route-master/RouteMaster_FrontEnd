import { useState } from 'react';

import EmptyHeart from '../../assets/images/emptyheart.png';
import FullHeart from '../../assets/images/fullheart.png';

import styles from './LikeButton.module.css';

function LikeButton(): JSX.Element {
  const [imgSrc, setImgSrc] = useState<string>(EmptyHeart);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setImgSrc(imgSrc === EmptyHeart ? FullHeart : EmptyHeart);
  };

  return (
    // eslint-disable-next-line react/no-array-index-key
    <button type="button" className={styles.container} onClick={onClick}>
      <img alt="add" src={imgSrc} className={styles.img} />
    </button>
  );
}

export default LikeButton;
