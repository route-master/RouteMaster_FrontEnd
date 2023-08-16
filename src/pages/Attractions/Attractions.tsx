import AttractionList from 'components/AttractionList/AttractionList';
import SideFilteringBar from 'components/SideFilteringBar/SideFilteringBar';
import styles from './Attractions.module.css';

function Attractions(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideFilteringBar type="hotels" />
      </div>
      <div className={styles.list}>
        <AttractionList />
      </div>
    </div>
  );
}

export default Attractions;
