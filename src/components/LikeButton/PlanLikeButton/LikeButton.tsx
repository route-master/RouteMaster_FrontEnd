import { useState } from 'react';
import EmptyHeart from 'assets/images/emptyheart.png';
import FullHeart from 'assets/images/fullheart.png';
import Modal from 'components/Modal/Modal';
import ModalContent from './ModalContent/ModalContent';
import styles from './LikeButton.module.css';

function LikeButton(): JSX.Element {
  const [imgSrc, setImgSrc] = useState<string>(EmptyHeart);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImgSrc(imgSrc === EmptyHeart ? FullHeart : EmptyHeart);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div>
      <button type="button" className={styles.container} onClick={onClick}>
        <img alt="add" src={imgSrc} className={styles.img} />
      </button>
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          Content={<ModalContent />}
          mywidth="500px"
          myheight="500px"
        />
      )}
    </div>
  );
}

export default LikeButton;
