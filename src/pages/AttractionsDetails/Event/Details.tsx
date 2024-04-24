/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import DetailHeader from 'components/DetailHeader/DetailHeader';
import PhotoGrid from 'components/PhotoGrid/PhotoGrid';
import DetailInfo from 'components/DetailInfo/Event/DetailInfo';
import ReviewBox from 'components/ReivewBox/ReviewBox';

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
  detailAddress: null | string;
  contentId: number;
  contentTypeId: number;
  copyrightType: string;
  image: string;
  thumbnailImage: string;
  createdTime: string;
  modifiedTime: string;
  bookTour: boolean;
  tel: null | string;
  homepage: null | string;
  zipcode: string;
  overview: string;
}

interface Response {
  resultCode: string;
  resultMessage: string;
  attractions: Attraction[];
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

function EventDetails(): JSX.Element {
  const param = useParams<{ id: string }>();
  const queryParams = new URLSearchParams(useLocation().search);
  const mapX: string = queryParams.get('mapX') ?? '';
  const mapY: string = queryParams.get('mapY') ?? '';
  const title = queryParams.get('title') ?? '';
  const [data, setData] = useState<Attraction>();
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get<Response>(
        `http://api.route-master.org/attraction/detail/common?contentId=${param.id}`,
      )
      .then((res) => {
        setData(res.data.attractions[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      // Fetch logic will be added later
      setPhotos([
        'https://cdn.egn.kr/news/photo/201406/63765_92223_3834.jpg',
        'https://cdn.eroun.net/news/photo/202305/32451_59595_5516.png',
        'https://www.fnnews.com/resource/media/image/2023/04/26/202304261112247557_l.jpg',
        'https://mblogthumb-phinf.pstatic.net/MjAxODA0MTdfMTM5/MDAxNTIzOTUwNzMxOTE4.91pD8d7ETC42_CSwK6UaaxD-joFARqsVcOkWMXk8_NYg.PSrbX8Tvihc45rMSLpYfBbLa3ZKLFqaNuEvY2joCYuEg.JPEG.gokory/1.jpg?type=w800',
        'http://www.sijung.co.kr/news/photo/202007/250773_78277_5441.jpg',
        'https://mblogthumb-phinf.pstatic.net/MjAyMzA3MTRfMTQ5/MDAxNjg5MzE2MDYxNDcy.vp4xlfhAEyK7WmZKSJWHUyNOAseX92tN_IcjyZW-IDYg.2hq2JmnojpOyAokbUm0w5NZ_6P8AGIQF1je6vdlnUy4g.JPEG.ssicanara/SE-d17ab816-a3ec-4d3a-9e72-e1b91a0e1c25.jpg?type=w800',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_S2Q8BSvciU5ZjVCehJXpd72oGuj2xyGm5AEntLu-j1MtXi-Q6G1SHAgxfzCRWNacwt4&usqp=CAU',
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
          address={data.address}
          tel={data.tel}
          homepage={data.homepage}
          overview={data.overview}
          bookTour={data.bookTour}
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

export default EventDetails;
