import RestaurantDetailCard from 'components/RestaurantCard/RestaurantDetailCard';
import MenuBox from 'components/MenuBox/MenuBox';
import Review from 'components/Reivew/Review';
import FacilitiesInfo from 'components/FacilitiesInfo/FacilitiesInfo';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Details.module.css';

interface AttractionDetails {
  [key: string]: string | boolean;
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

interface DetailsResponse {
  resultCode: string;
  resultMessage: string;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  detail: AttractionDetails;
}

function Details(): JSX.Element {
  const [data, setData] = useState<AttractionDetails>();
  const param = useParams<{ pagetype: string; id: string }>();

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await axios.get<DetailsResponse>(
        `/attraction/detail/${param.pagetype}?contentId=${param.id}`,
      );
      setData(response.data.detail);
    };
    try {
      fetchDetails();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className={styles.container}>
      <RestaurantDetailCard />
      {data && <FacilitiesInfo data={data} />}
      <MenuBox />
      <Review />
    </div>
  );
}

export default Details;
