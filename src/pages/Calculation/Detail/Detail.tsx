import PriceList from 'components/PriceList/PriceList';
import PersonList from 'components/PersonList/PersonList';
import styles from './Detail.module.css';

function CalculationDetail(): JSX.Element {
  return (
    <div className={styles.container}>
      <PersonList />
      <div>
        내야될 돈
        <PriceList data={[]} />
      </div>
      <div>
        받아야될 돈
        <PriceList data={[]} />
      </div>
    </div>
  );
}

export default CalculationDetail;
