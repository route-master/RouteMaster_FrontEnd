import styles from './TotalPrice.module.css';

interface Props {
  title: string;
  price: number;
}

function TotalPrice({ title, price }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.price}>
        총 비용:
        <span className={styles.price_style}>₩ {price.toLocaleString()} </span>
      </div>
    </div>
  );
}

export default TotalPrice;
