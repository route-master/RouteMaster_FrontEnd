/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styles from './PhotoGrid.module.css';

interface Props {
  photos: string[];
}

// { photos }: Props
function PhotoGrid(photos: Props): JSX.Element {
  const [bigPhotos, setBigPhotos] = useState<string[]>(photos.slice(0, 5));

  const onClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const newBigPhotos = [...bigPhotos];
    const temp = newBigPhotos[0];
    newBigPhotos[0] = newBigPhotos[index];
    newBigPhotos[index] = temp;
    setBigPhotos(newBigPhotos);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main_photo}>
        <img src={bigPhotos[0]} alt="" />
      </div>
      <div className={styles.first} onClick={(e) => onClick(e, 1)}>
        <img src={bigPhotos[1]} alt="" />
      </div>
      <div className={styles.second} onClick={(e) => onClick(e, 2)}>
        <img src={bigPhotos[2]} alt="" />
      </div>
      <div className={styles.third} onClick={(e) => onClick(e, 3)}>
        <img src={bigPhotos[3]} alt="" />
      </div>
      <div className={styles.more}>
        <img src={bigPhotos[4]} alt="" />
        <div className={styles.more_guide}>
          <p>사진 더보기</p>
        </div>
      </div>
    </div>
  );
}

export default PhotoGrid;
