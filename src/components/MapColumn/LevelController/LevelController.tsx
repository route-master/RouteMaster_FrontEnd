import styles from './LevelController.module.css';

interface Props {
  zoomIn: () => void;
  zoomOut: () => void;
}

function MapColumnLevelController({ zoomIn, zoomOut }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <button className={styles.zoomin} type="button" onClick={zoomIn}>
        <img
          className={styles.icon}
          src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
          alt="확대"
        />
      </button>
      <button className={styles.zoomout} type="button" onClick={zoomOut}>
        <img
          className={styles.icon}
          src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
          alt="축소"
        />
      </button>
    </div>
  );
}

export default MapColumnLevelController;
