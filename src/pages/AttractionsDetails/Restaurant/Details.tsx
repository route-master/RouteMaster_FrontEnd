/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import DetailInfo from 'components/DetailInfo/Restaurant/DetailInfo';

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
  const param = useParams<{ id: string }>();

  const queryParams = new URLSearchParams(useLocation().search);
  const mapX: string = queryParams.get('mapX') ?? '';
  const mapY: string = queryParams.get('mapY') ?? '';

  useEffect(() => {
    axios
      .get<Response>(`/attraction/detail/restaurant?contentId=${param.id}`)
      .then((res) => {
        setData(res.data.detail);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {data && (
        <DetailInfo
          infoCenter={data.infoCenter}
          parking={data.parking}
          restDate={data.restDate}
          mapX={parseFloat(mapX)}
          mapY={parseFloat(mapY)}
        />
      )}
    </div>
  );
}

export default RestaurantDetails;
