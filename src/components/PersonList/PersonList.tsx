import styles from './PersonList.module.css';

function PersonList(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4440/4440953.png"
          alt="person"
        />
      </div>
      <div className={styles.wrap}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/10751/10751887.png"
          alt="person"
        />
      </div>
      <div className={styles.wrap}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3502/3502449.png"
          alt="plus"
        />
      </div>
    </div>
  );
}

export default PersonList;
