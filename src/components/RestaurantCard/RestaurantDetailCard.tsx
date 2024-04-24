import styles from './RestaurantDetailCard.module.css';

function RestaurantDetailCard(): JSX.Element {
  return (
    <div className={styles.container}>
      <img
        src="https://img.siksinhot.com/place/1457946348861393.PNG?w=307&h=300&c=Y"
        alt="대표이미지"
      />
      <div className={styles.wrap}>
        <div>Restautant Name</div>
        <div className={styles.contents}>
          <div>영업시간: 12:00 ~ 9:00</div>
          <div>주소: 서울 특별시 노원구 ~</div>
          <div>전화번호: 010-0000-0000</div>
          <div className={styles.sub_wrap}>
            <div>views: 999999</div>
            <div>likes: 100000</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetailCard;
