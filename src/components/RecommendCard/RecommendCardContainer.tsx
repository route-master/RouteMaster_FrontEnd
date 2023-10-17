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
}

interface WeatherResponse {
  date: string;
  totalCityName: string;
  doName: string;
  cityName: string;
  cityAreaId: string;
  tourApiAreaCode: 0;
  tourApiSigunguCode: 0;
  kmaTci: 0;
  tci_GRADE: string;
}

function RecommendCardContainer(props: Props): JSX.Element {
  const { type, age } = props;
  const [data, setData] = useState<Attraction[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(''); // YYYYMMDD
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [city, setCity] = useState('');
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

  const setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const getAddressInfo = (lat: number, lng: number) => {
    const apiEndpoint = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`;

    axios
      .get(apiEndpoint, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      })
      .then((res) => {
        const data = { ...res.data };
        if (data.documents && data.documents.length > 0) {
          const city = data.documents[0].region_1depth_name;
          setCity(city);
        } else {
          console.log('No address found');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const getCityAreaId = () => {
    let cityAreaId;

    if (city.startsWith('서울')) cityAreaId = 1;
    else if (city.startsWith('인천')) cityAreaId = 2;
    else if (city.startsWith('대전')) cityAreaId = 3;
    else if (city.startsWith('대구')) cityAreaId = 4;
    else if (city.startsWith('광주')) cityAreaId = 5;
    else if (city.startsWith('부산')) cityAreaId = 6;
    else if (city.startsWith('울산')) cityAreaId = 7;
    else if (city.startsWith('세종')) cityAreaId = 8;
    else if (city.startsWith('경기')) cityAreaId = 31;
    else if (city.startsWith('강원')) cityAreaId = 32;

    return cityAreaId;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    setDate(`${year}${month}${date}`);
  };

  const getLatLng = (address: string): { mapX: string; mapY: string } => {
    const apiEndpoint = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`;

    axios
      .get(apiEndpoint, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      })
      .then((res) => {
        console.log('Response:', res);
        return { mapX: res.data.documents?.x, mapY: res.data.documents?.y };
      })
      .catch((e) => console.log('Error:', e));
    return { mapX: '37.5519', mapY: '126.9918' }; // default: 서울역
  };

  useEffect(() => {
    switch (type) {
      case '나이별':
        axios
          .get<Response>(
            `http://api.route-master.org/recommend/age-based?age=${age}`,
          )
          .then((res) => {
            setData(res.data.attractions);
            setTitle(`${age}대 추천`);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      // case '날씨별':
      //   setToday();
      //   setCurrentLocation();
      // break;
      case '내주변':
        setCurrentLocation();
        break;
      default:
        console.log('default');
    }
  }, []);

  useEffect(() => {
    if (type === '날씨별' && city) {
      axios
        .get<WeatherResponse[]>(
          `http://api.route-master.org/recommend/weather-based/tourism-climate-index?date=${date}&day=0&cityAreaId=${getCityAreaId()}`,
        )
        .then((res) => {
          const mapInfo: { mapX: string; mapY: string } = getLatLng(
            res.data[0].totalCityName,
          );
          axios
            .get<Response[]>(
              `http://api.route-master.org/recommend/location-based?mapX=${mapInfo.mapX}&mapY=${mapInfo.mapY}`,
            )
            .then((res) => {
              const activityData = res.data.map((item) => item.attractions[0]);
              setData(activityData);
            })
            .catch((err) => {
              console.log(err);
            });
          setTitle('날씨별 추천');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [city]);

  useEffect(() => {
    getAddressInfo(location.lat, location.lng);
    if (location.lat !== 0 && location.lng !== 0 && type === '내주변') {
      axios
        .get<Response[]>(
          `http://api.route-master.org/recommend/location-based?mapX=${location.lng}&mapY=${location.lat}`,
        )
        .then((res) => {
          console.log(res.data);
          const activityData: Attraction[] = res.data
            .filter((item) => item.attractions.length > 0)
            // Flatten the array structure
            .flatMap((item) => item.attractions);
          console.log(activityData);
          setData(activityData);
          setTitle(`내주변 인기`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [location]);

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
