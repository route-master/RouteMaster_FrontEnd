/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import DetailHeader from 'components/DetailHeader/DetailHeader';
import PhotoGrid from 'components/PhotoGrid/PhotoGrid';
import DetailInfo from 'components/DetailInfo/Restaurant/DetailInfo';
import ReviewBox from 'components/ReivewBox/ReviewBox';

interface Detail {
  creditcardInfo: string;
  discountInfo: string | null;
  signatureMenu: string;
  infoCenter: string;
  kidsFacility: string;
  openDate: string | null;
  packing: string;
  parking: string;
  reservation: string;
  restDate: string | null;
  scale: string | null;
  smoking: string | null;
  menu: string;
  licenseNumber: string;
}

interface Response {
  resultCode: string;
  resultMessage: string;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  detail: Detail;
}

function RestaurantDetails(): JSX.Element {
  const [data, setData] = useState<Detail>();
  const [photos, setPhotos] = useState<string[]>([]);
  const param = useParams<{ id: string }>();

  const queryParams = new URLSearchParams(useLocation().search);
  const mapX: string = queryParams.get('mapX') ?? '';
  const mapY: string = queryParams.get('mapY') ?? '';
  const title = queryParams.get('title') ?? '';

  useEffect(() => {
    axios
      .get<Response>(
        `http://api.route-master.org/attraction/detail/restaurant?contentId=${param.id}`,
      )
      .then((res) => {
        setData(res.data.detail);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      // Fetch logic will be added later
      setPhotos([
        'https://img.hani.co.kr/imgdb/resize/2020/1023/160334459702_20201023.JPG',
        'https://mblogthumb-phinf.pstatic.net/MjAyMzAzMjBfMTI0/MDAxNjc5MzE3NjIwMjUx.ebNZ8FAO-Len38hzrh4yxqYdkTl8uPyIE2nKMMNK5k8g.3OKhJykKs5ZU32GEN5nlwKobIuJEeaRyWqyejVKtQ0Ag.JPEG.lv5photo/%EF%BB%BF%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%97%AC%ED%96%89_%EC%A0%9C%EC%A3%BC%EC%8B%9C_%EC%A0%90%EC%8B%AC%ED%98%BC%EB%B0%A5_%EC%88%9C%EB%8C%80%EA%B5%AD_%EB%A7%9B%EC%A7%91_%EC%84%B1%EA%B3%B5%EC%8B%9D%EB%8B%B9_(4).jpg?type=w800',
        'https://mblogthumb-phinf.pstatic.net/MjAyMzAzMjBfMjg0/MDAxNjc5MzE3NjMxMzc4.wcVQkceLeKx70lyoD0KQUsp9y7AC7TvwLAcvlIVMaWcg.qZgbPhxXNvaCScJrrmNc0mq3N_2wJ5IOJfjca_FId8og.JPEG.lv5photo/%EF%BB%BF%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%97%AC%ED%96%89_%EC%A0%9C%EC%A3%BC%EC%8B%9C_%EC%A0%90%EC%8B%AC%ED%98%BC%EB%B0%A5_%EC%88%9C%EB%8C%80%EA%B5%AD_%EB%A7%9B%EC%A7%91_%EC%84%B1%EA%B3%B5%EC%8B%9D%EB%8B%B9_(19).jpg?type=w800',
        'https://think-note.com/wp-content/uploads/2023/07/local_2-930x620.jpeg',
        'https://m.travelyangpyeong.com/web/product/big/201608/68_shop1_702525.jpg',
        'https://www.sj.go.kr/data/content/20190802/682C9892B39F40EAB817BA3CF7BD25E1.jpg',
        'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/425/640dfae03611d63c88c9b417334bd9ce_res.jpeg',
      ]);
    };

    fetchPhotos();
  }, []);

  return (
    <div>
      <DetailHeader title={title} />
      <div style={{ width: '100%', height: '25rem' }}>
        <PhotoGrid photos={photos} />
      </div>
      {data && (
        <DetailInfo
          infoCenter={data.infoCenter}
          parking={data.parking}
          restDate={data.restDate}
          mapX={parseFloat(mapX)}
          mapY={parseFloat(mapY)}
        />
      )}
      <div>
        <ReviewBox />
      </div>
    </div>
  );
}

export default RestaurantDetails;
