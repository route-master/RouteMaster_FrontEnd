import { useState, useEffect } from 'react';
import EmptyHeart from 'assets/images/emptyheart.png';
import FullHeart from 'assets/images/fullheart.png';
import Modal from 'components/Modal/Modal';
import ModalContent from './ModalContent/ModalContent';
import styles from './LikeButton.module.css';

interface Props {
  contentId: number;
}

function LikeButton({ contentId }: Props): JSX.Element {
  const [imgSrc, setImgSrc] = useState<string>(EmptyHeart);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isListClicked, setIsListClicked] = useState<boolean>(false);
  const [type, setType] = useState<string>('add');

  useEffect(() => {
    if (isListClicked) {
      if (type === 'add') {
        setImgSrc(FullHeart);
        setType('remove');
      } else if (type === 'remove') {
        setImgSrc(EmptyHeart);
        setType('add');
      }
      setModalOpen(false);
      setIsListClicked(false);
    }
  }, [isListClicked]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div className={styles.container}>
      <button type="button" className={styles.btn} onClick={handleClick}>
        <img alt="add" src={imgSrc} />
      </button>
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          Content={
            <ModalContent
              type={type}
              setIsListClicked={setIsListClicked}
              contentId={contentId}
            />
          }
          mywidth="500px"
          myheight="500px"
        />
      )}
    </div>
  );
}

export default LikeButton;
