import styles from './MenuBox.module.css';

function MenuItem(): JSX.Element {
  return (
    <div className={styles.menu_wrap}>
      <div>닭발</div>
      <div>10000₩</div>
    </div>
  );
}

function MenuBox(): JSX.Element {
  return (
    <div className={styles.container}>
      <div>Menu</div>
      <div className={styles.contents}>
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </div>
  );
}

export default MenuBox;
