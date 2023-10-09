/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecommendCard from './RecommendCard';
import styles from './RecommendCardContainer.module.css';

type Props = {
  type: string;
  age?: number;
};

interface Response {
  resultCode: string;
  resultMessage: string;
  attractions: Attraction[];
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

interface Attraction {
  title: string;
  largeCategory: string;
  mediumCategory: string;
  smallCategory: string;
  mapX: number;
  mapY: number;
  areaCode: number;
  sigunguCode: number;
  mapLevel: number;
  address: string;
  detailAddress: string;
  contentId: number;
  contentTypeId: number;
  copyrightType: string;
  image: string;
  thumbnailImage: string;
  createdTime: string;
  modifiedTime: string;
  bookTour: boolean;
  tel: null | string;
  zipCode: string;
};

function RecommendCardContainer(props: Props): JSX.Element {
  const { type, age } = props;
  const [data, setData] = useState<Attraction[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(''); // YYYYMMDDHH
  const [location, setLocation] = useState({ lat: 0, lon: 0 });

  const setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  };

  const setToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const hour = String(today.getHours()).padStart(2, '0');
    setDate(`${year}${month}${date}${hour}`);
  };

  useEffect(() => {
    switch (type) {
      case '나이별':
        axios
          .get<Response>(`/recommend/age-based?age=${age}`)
          .then((res) => {
            setData(res.data.attractions);
            setTitle(`${age}대 추천`);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case '날씨별':
        setToday();
        axios
          .get<Response>(
            `/recommend/weather-based/tourism-climate-index?date=${date}&day=1&cityAreaId=1`,
          )
          .then((res) => {
            setData(res.data.attractions);
            setTitle('날씨별 추천');
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case '내주변':
        setCurrentLocation();
        axios
          .get<Response>(
            `/recommend/location-based?mapX=${location.lon}?mapY=${location.lat}`,
          )
          .then((res) => {
            setData(res.data.attractions);
            setTitle(`서울 인기`);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
        console.log('default');
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>{title}</h2>
        <Link to="/keyword" className={styles.more}>
          더보기
        </Link>
      </div>

      <div className={styles.cards_wrapper}>
        <div className={styles.cards}>
          {data.map((item) => (
            <Link
              to={`/attractions/event/details/${item.contentId}`}
              className={styles.card}
              key={item.contentId}
            >
              <RecommendCard title={item.title} imgsrc={item.thumbnailImage} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

RecommendCardContainer.defaultProps = {
  age: 0,
};

export default RecommendCardContainer;
