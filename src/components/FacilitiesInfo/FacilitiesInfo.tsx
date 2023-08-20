import FacilityItem from './FacilityItem';
import styles from './FacilitiesInfo.module.css';

interface AttractionDetails {
  [key: string]: boolean | string;
  accomodationCount: string;
  benikia: boolean;
  checkInTime: string;
  checkOutTime: string;
  cookingInfo: string;
  foodPlace: string;
  goodStay: boolean;
  hanok: boolean;
  infoCenter: string;
  parking: string;
  pickup: string;
  roomCount: string;
  reservation: string;
  reservationUrl: string;
  roomType: string;
  scale: string;
  subFacility: string;
  barbecue: boolean;
  beautyFacility: boolean;
  beverage: boolean;
  bicycleRent: boolean;
  campfire: boolean;
  fitness: boolean;
  karaoke: boolean;
  publicBath: boolean;
  publicPC: boolean;
  sauna: boolean;
  seminar: boolean;
  sports: boolean;
  refundPolicy: string;
}

interface Props {
  data: AttractionDetails;
}

function FacilitiesInfo({ data }: Props): JSX.Element {
  const facilityList = {
    parking: 'https://img.icons8.com/ios/100/parking.png',
    valetparking: 'https://img.icons8.com/ios/100/valet-parking.png',
    pickup: 'https://img.icons8.com/ios/100/sedan.png',
    barbeque: 'https://img.icons8.com/ios/100/weber.png',
    campfire: 'https://img.icons8.com/ios/100/campfire.png',
    // eslint-disable-next-line prettier/prettier
    karaoke: 'https://img.icons8.com/external-becris-lineal-becris/64/external-karaoke-celebration-becris-lineal-becris.png',
    fitness: 'https://img.icons8.com/ios/100/treadmill.png',
    sauna: 'https://img.icons8.com/ios/100/sauna.png',
    convenient: 'https://img.icons8.com/ios/100/online-store.png',
    seminar: 'https://img.icons8.com/ios/100/training.png',
    publicBath: 'https://img.icons8.com/ios/100/bath.png',
    bicycleRent: 'https://img.icons8.com/ios-filled/50/bicycle.png',
    cookingInfo: 'https://img.icons8.com/windows/96/cooking.png',
  };

  return (
    <div className={styles.container}>
      <h3>시설 & 서비스</h3>
      <div className={styles.info_container}>
        {Object.entries(facilityList).map(([key, value]) => {
          return data[key] ? (
            <div className={styles.facility_item} key={key}>
              <FacilityItem title={key} imgsrc={value} />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default FacilitiesInfo;
