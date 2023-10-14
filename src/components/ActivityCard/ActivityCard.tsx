import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useState } from 'react';
import { useDrag } from 'react-dnd';
import Modal from 'components/Modal/Modal';
import ModalContent from './ModalContent/ModalContent';
import styles from './ActivityCard.module.css';

interface Activity {
  createdAt: string;
  updatedAt: string;
  id: string;
  planGroupId: string;
  writer: string;
  name: string;
  description: string;
  beginDate: string;
  endDate: string;
  mapInfo: { lat: number; lng: number };
  thumbnailImageUrl: string;
  activityType: string;
  paymentInfo: PaymentLogs;
  referenceType: string;
  referenceId: string;
  planPaymentInfo?: PaymentLogs;
}
interface PaymentLogs {
  paymentLogs: Log[];
}
interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

interface Props {
  activity: Activity;
}

function ActivityCard({ activity }: Props): JSX.Element {
  const { id, name, activityType, thumbnailImageUrl } = activity;
  const [modalOpen, setModalOpen] = useState(false);
  let borderColor: string;

  if (activityType.toUpperCase() === 'HOTEL') {
    borderColor = 'red';
  } else if (activityType.toUpperCase() === 'ATTRACTION') {
    borderColor = 'blue';
  } else {
    borderColor = 'purple';
  }

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'activity',
      canDrag: !modalOpen,
      item: { ...activity },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  );

  const handlePayment = () => {
    setModalOpen(true);
  };

  const containerStyle = {
    opacity: isDragging ? 0.5 : 1,
    border: `1px solid ${borderColor}`,
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div ref={dragRef} className={styles.container} style={containerStyle}>
      <img src={thumbnailImageUrl} alt="" className={styles.thumb} />
      <h3>{name}</h3>
      <div className={styles.rightside_wrapper}>
        <button
          className={styles.payment}
          type="button"
          onClick={handlePayment}
        >
          정산하기
        </button>
        {modalOpen && (
          <Modal
            Content={
              <ModalContent id={id} paymentInfo={activity.paymentInfo} />
            }
            setModalOpen={setModalOpen}
            mywidth="600px"
            myheight="400px"
          />
        )}
        <DragIndicatorIcon fontSize="large" cursor="pointer" />
      </div>
    </div>
  );
}

export default ActivityCard;
