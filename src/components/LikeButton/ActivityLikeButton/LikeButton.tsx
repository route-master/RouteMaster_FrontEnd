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
  const { id } = useParams<{ id: string }>();
  const [imgSrc, setImgSrc] = useState<string>('');

  const addActivity = () => {
    axios
      .get<PlanObj>(`/plan/group/${id}`)
      .then((res) => {
        axios
          .post('/plan/activity', {
            id: null,
            planGroupId: id,
            name: title,
            mapInfo: mapObj,
            beginDate: res.data.beginDate,
            endDate: res.data.endDate,
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
      .get<Activity[]>(`/plan/activily/list/${id}`)
      .then((res) => {
        res.data.forEach((activity: Activity) => {
          if (activity.mapInfo === mapObj) {
            axios.delete(`/plan/activity/${activity.id}`).catch((err) => {
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
        .get<Activity[]>(`/plan/activily/list/${id}`)
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
