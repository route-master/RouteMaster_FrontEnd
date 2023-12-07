import { forwardRef } from 'react';
import PaidInput from '../PaidInput/PaidInput';
import OwedInput from '../OwedInput/OwedInput';
import styles from './LogItem.module.css';

interface Props {
  members: { id: string; nickname: string }[];
  currentLog: Log;
  index: number;
  handleChange: (index: number, updatedLog: Log) => void;
  paymentRef: React.RefObject<HTMLInputElement>;
}

interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

function LogItem({
  members,
  index,
  currentLog,
  handleChange,
  paymentRef,
}: Props): JSX.Element {
  const handleChangeWithoutIndex = (updatedLog: Log) => {
    handleChange(index, updatedLog);
  };

  return (
    <div className={styles.container}>
      <PaidInput
        members={members}
        currentLog={currentLog}
        handleChange={handleChangeWithoutIndex}
      />
      <OwedInput
        members={members}
        currentLog={currentLog}
        handleChange={handleChangeWithoutIndex}
      />
      <input
        type="number"
        min="0"
        ref={paymentRef}
        defaultValue={currentLog.payment}
        className={styles.payment_input}
        placeholder="금액을 입력 해주세요!"
      />
    </div>
  );
}

export default forwardRef(LogItem);
