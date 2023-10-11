import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import ModalContent from './ModalContent/ModalContent';
import styles from './AddPlanCard.module.css';

function AddPlanCard(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <h3>새로운 계획을 만들어 보세요!</h3>
      <button type="button" className={styles.btn} onClick={handleClick}>
        +
      </button>
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          Content={<ModalContent setModalOpen={setModalOpen} />}
          mywidth="700px"
          myheight="450px"
        />
      )}
    </div>
  );
}

export default AddPlanCard;
