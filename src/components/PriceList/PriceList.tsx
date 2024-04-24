import DefaultImg from 'assets/images/logo_black.png';
import styles from './PriceList.module.css';

type CalcObject = {
  sender: string;
  receiver: string;
  amount: number;
};

interface Props {
  data: CalcObject[];
}

function PriceList({ data }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      {data && data.length > 0 ? (
        <ul className={styles.wrap}>
          {data.map((item) => (
            <li key={item.receiver} className={styles.li}>
              <div className={styles.person}>
                <img src={DefaultImg} alt="person" />
                {item.receiver}
              </div>
              <div className={styles.price}>
                ₩ {item.amount.toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>데이터가 없습니다.</div>
      )}
    </div>
  );
}

export default PriceList;
