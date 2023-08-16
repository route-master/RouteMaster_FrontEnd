import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AttractionItem from './AttractionItem';
import styles from './AttractionList.module.css';

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
  tel: string;
  benikia: boolean;
  goodStay: boolean;
  hanok: boolean;
}

interface ApiResponse {
  resultCode: string;
  resultMessage: string;
  attractions: Attraction[];
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

function AttractionList(): JSX.Element {
  const [data, setData] = useState<Attraction[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setpage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>(
          `/attraction-search/stay?numOfRows=10&pageNo=${page}&arrange=A&areaCode=1&sigunguCode=1`,
        );
        console.log(response.data);
        setData((data) => [...(data || []), ...response.data.attractions]);
        setIsLoading(false);
      } catch (error) {
        alert('마지막 페이지입니다.');
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const scrollEvent = () => {
      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      if (!isLoading && scrollHeight - innerHeight - scrollTop < 10) {
        setpage((page) => page + 1);
      }
    };
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [isLoading]);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <ul className={styles.container}>
      {data.map((item) => (
        <Link
          to={`/restaurant/details/${item.contentId}`}
          key={`link-${item.contentId}`}
        >
          <AttractionItem
            id={item.contentId}
            thumb={item.thumbnailImage}
            title={item.title}
          />
        </Link>
      ))}
      {!isLoading && <div>로딩중...</div>}
    </ul>
  );
}

export default AttractionList;
