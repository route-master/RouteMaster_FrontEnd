import { useRef } from 'react';
import styles from './PhotoModal.module.css';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  photos: string[];
}

function PhotoModal({ setModalOpen, photos }: Props): JSX.Element {
  const bgRef = useRef<HTMLDivElement>(null);

  const handleClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === bgRef.current) {
      closeModal();
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={bgRef}
      className={styles.background}
      onClick={handleClickBackground}
    >
      <div className={styles.container}>
        <div className={styles.contents}>
          {photos.map((photo) => (
            <img src={photo} alt="" key={photo} className={styles.img} />
          ))}
        </div>
        <button className={styles.closebtn} type="button" onClick={closeModal}>
          x
        </button>
      </div>
    </div>
  );
}

export default PhotoModal;
