import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import RestaurantDetailCard from 'components/RestaurantCard/RestaurantDetailCard';
import PhotoGrid from 'components/PhotoGrid/PhotoGrid';
import FacilitiesInfo from 'components/FacilitiesInfo/FacilitiesInfo';
import MenuBox from 'components/MenuBox/MenuBox';
import Review from 'components/Reivew/Review';
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

function HotelDetails(): JSX.Element {
  const [data, setData] = useState<AttractionDetails>();
  const [photos, setPhotos] = useState<string[]>([]);
  const param = useParams<{ pagetype: string; id: string }>();

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      try {
        const response = await axios.get<DetailsResponse>(
          `/attraction/detail/stay?contentId=${param.id}`,
        );
        setData(response.data.detail);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };

    fetchFacilityDetails();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      // Fetch logic will be added later
      setPhotos([
        'https://wordpress-network.prod.aws.skyscnr.com/wp-content/uploads/2018/12/10_Kempinski-Hotel-Xiamen_1.jpg',
        'https://gyeongju.go.kr/upload/content/thumb/20200427/E9D9359E9D80456C849469C10B191395.jpg',
        'https://josunhotel.com/revolution/content/fileImage.do?fileId=256249&cntntsSn=256248',
        'https://t1.daumcdn.net/cfile/tistory/210B323A543F89C431',
        'https://image.news1.kr/system/photos/2020/3/22/4112159/article.jpg/dims/optimize',
        'https://i.namu.wiki/i/1CZIsa4mm9fkdaT1ePAPxOqClElof7bOqam5QGDeFJzpz1snWc_SV41A5z6-XQNL-na2lR2h1wVi7etI5cYZ-g.webp',
        'https://www.hotelnaruseoul.com/wp-content/uploads/sites/18/2022/10/%ED%98%B8%ED%85%94-%EB%82%98%EB%A3%A8-%EC%84%9C%EC%9A%B8-%EC%97%A0%EA%B0%A4%EB%9F%AC%EB%A6%AC_%EB%9D%BC%EC%9A%B4%EC%A7%80-%EB%8D%B0%ED%81%AC-2200x1200.jpg',
      ]);
    };

    fetchPhotos();
  }, []);

  return (
    <div className={styles.container}>
      <RestaurantDetailCard />
      <div className={styles.photo_grid}>
        <PhotoGrid photos={photos} />
      </div>
      {data && <FacilitiesInfo data={data} />}
      <MenuBox />
      <Review />
    </div>
  );
}

export default HotelDetails;
