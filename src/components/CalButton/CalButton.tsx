import styles from './CalButton.module.css';

interface Props {
  handleClick: () => void;
}

function CalButton({ handleClick }: Props): JSX.Element {
  return (
    <button type="button" className={styles.btn} onClick={handleClick}>
      정산하기
    </button>
  );
}

export default CalButton;
