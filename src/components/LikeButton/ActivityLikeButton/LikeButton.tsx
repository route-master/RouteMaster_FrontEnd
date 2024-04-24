/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmptyHeart from 'assets/images/emptyheart.png';
import FullHeart from 'assets/images/fullheart.png';
import styles from './LikeButton.module.css';

interface Activity {
  createdAt: string;
  updatedAt: string;
  id: string;
  planGroupId: string;
  writer: string;
  name: string;
  description: string;
  beginDate: string;
  endDate: string;
  mapInfo: { lat: number; lng: number };
  thumbnailImageUrl: string;
  activityType: string;
  paymentInfo: PaymentLogs;
  referenceType: string;
  referenceId: string;
  planPaymentInfo: PaymentLogs;
}
interface PaymentLogs {
  paymentLogs: Log[];
}
interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

interface PlanObj {
  createdAt: string;
  updatedAt: string;
  id: string;
  writer: string;
  name: string;
  description: string;
  thumbnailimageUrl: string;
  participants: string[];
  beginDate: string;
  endDate: string;
}

interface Props {
  title: string;
  mapObj: {
    lat: number;
    lng: number;
  };
}

function ActivityLikeButton({ title, mapObj }: Props): JSX.Element {
  const { planGroupId } = useParams<{ planGroupId: string }>();
  const [imgSrc, setImgSrc] = useState<string>('');
  const header = {
    'Content-Type': 'application/json',
    'Allow-Access-Control': 'http://34.64.158.170:30000',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };

  console.log(localStorage.getItem('accessToken'));

  const addActivity = () => {
    axios
      .get<PlanObj>(`/plan/group/${planGroupId}`, { headers: header })
      .then((res) => {
        const mydata = {
          // eslint-disable-next-line object-shorthand
          planGroupId: planGroupId,
          name: title,
          mapInfo: mapObj,
          beginDate: res.data.beginDate,
          endDate: res.data.endDate,
          activityType: 'UNKNOWN',
          referenceType: 'KAKAO',
          referenceId: planGroupId,
        };
        console.log('data: ', mydata);
        axios
          .post('/plan/activity', {
            headers: header,
            data: {
              id: null,
              // eslint-disable-next-line object-shorthand
              planGroupId: planGroupId,
              name: title,
              mapInfo: mapObj,
              beginDate: res.data.beginDate,
              endDate: res.data.endDate,
              activityType: 'UNKNOWN',
              referenceType: 'KAKAO',
              referenceId: planGroupId,
            },
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    setImgSrc(FullHeart);
  };

  const removeActivity = () => {
    axios
      .get<Activity[]>(`/plan/activity/list/${planGroupId}`, {
        headers: header,
      })
      .then((res) => {
        res.data.forEach((activity: Activity) => {
          if (activity.mapInfo === mapObj) {
            axios
              .delete(`/plan/activity/${activity.id}`, {
                headers: header,
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setImgSrc(EmptyHeart);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (imgSrc === EmptyHeart) addActivity();
    else removeActivity();
  };

  useEffect(() => {
    // When first rendering, check if the activity is in the plan
    if (imgSrc === '') {
      axios
        .get<Activity[]>(`/plan/activity/list/${planGroupId}`, {
          headers: header,
        })
        .then((res) => {
          res.data.forEach((activity: Activity) => {
            if (activity.mapInfo === mapObj) {
              setImgSrc(FullHeart);
            }
          });
          if (imgSrc === '') setImgSrc(EmptyHeart);
        })
        .catch((err) => {
          console.log(err);
          // test data
          setImgSrc(EmptyHeart);
        });
    }
  });

  return (
    <div className={styles.container}>
      <button type="button" className={styles.button} onClick={onClick}>
        <img alt="add" src={imgSrc} className={styles.img} />
      </button>
    </div>
  );
}

export default ActivityLikeButton;
