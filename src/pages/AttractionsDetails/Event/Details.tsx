/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import DetailInfo from 'components/DetailInfo/Event/DetailInfo';

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
  const [data, setData] = useState<Attraction>();

  useEffect(() => {
    axios
      .get<Response>(`/attraction/detail/common?contentId=${param.id}`)
      .then((res) => {
        setData(res.data.attractions[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
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
    </div>
  );
}

export default EventDetails;
