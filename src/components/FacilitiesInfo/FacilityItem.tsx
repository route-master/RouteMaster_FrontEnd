import styles from './FacilityItem.module.css';

interface Props {
  title: string;
  imgsrc: string;
}

function FacilityItem({ title, imgsrc }: Props): JSX.Element {
  type Titles = {
    [key: string]: string;
  };
  const koreantitles: Titles = {
    parking: '주차장',
    pickup: '픽업서비스',
    reservation: '예약안내',
    reservationUrl: '예약안내',
    roomType: '객실유형',
    scale: '규모',
    subFacility: '부대시설',
    barbecue: '바비큐장',
    beautyFacility: '뷰티시설',
    beverage: '식음료장',
    bicycleRent: '자전거대여',
    campfire: '캠프파이어',
    fitness: '헬스장',
    karaoke: '노래방',
    publicBath: '공중목욕탕',
    publicPC: 'PC방',
    sauna: '사우나',
    seminar: '세미나실',
    sports: '스포츠시설',
    cookingInfo: '취사 가능',
  };

  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <img className={styles.img} src={imgsrc} alt="parking" />
      </div>
      <div className={styles.title}> {koreantitles[title]} </div>
    </div>
  );
}

export default FacilityItem;
