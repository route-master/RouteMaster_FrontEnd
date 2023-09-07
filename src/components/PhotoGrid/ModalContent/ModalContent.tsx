import styles from './ModalContent.module.css';

interface Props {
  photos: string[];
}

function PhotoModal({ photos }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      {photos.map((photo) => (
        <img src={photo} alt="" key={photo} className={styles.img} />
      ))}
    </div>
  );
}

export default PhotoModal;
