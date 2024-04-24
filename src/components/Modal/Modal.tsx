/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from 'react';
import styles from './Modal.module.css';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Content: React.ReactElement;
  mywidth: string;
  myheight: string;
}

function Modal({
  setModalOpen,
  Content,
  mywidth,
  myheight,
}: Props): JSX.Element {
  const bgRef = useRef<HTMLDivElement>(null);
  const size = { width: mywidth, height: myheight };

  const closeModal = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (e.target === bgRef.current || e.target instanceof HTMLButtonElement) {
      setModalOpen(false);
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <div
      ref={bgRef}
      className={styles.background}
      onClick={(e) => closeModal(e)}
      data-testid="modal-background"
    >
      <div className={styles.container} style={size}>
        <div className={styles.closebtn_wrapper}>
          <button
            className={styles.closebtn}
            type="button"
            onClick={(e) => closeModal(e)}
          >
            x
          </button>
        </div>
        <div className={styles.content_wrapper}> {Content} </div>
      </div>
    </div>
  );
}

export default Modal;
