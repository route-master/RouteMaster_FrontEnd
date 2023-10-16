/* eslint-disable no-console */
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import store, { RootState } from 'store/store';
import { setActivities } from 'store/Slices/activitiesSlice';
import { Link } from 'react-router-dom';

import Menu from './Menu/Menu';
import PlanInfoBox from './PlanInfoBox/PlanInfoBox';
import ActivityCard from '../ActivityCard/ActivityCard';
import DragTargetLine from './DragTargetLine/DragTargetLine';
import styles from './PlanColumn.module.css';

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
  planPaymentInfo?: PaymentLogs;
}
interface PaymentLogs {
  paymentLogs: Log[];
}
interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

function PlanColumn(): JSX.Element {
  const dispatch = useDispatch();
  const activities = useSelector((state: RootState) => state.activities);

  const planGroupId = '1';

  const getHour = (date: string) => {
    const hour = new Date(date).getUTCHours();
    return hour;
  };
  const updateHour = (date: string, hour: number) => {
    const newDate = new Date(date);
    newDate.setUTCHours(hour);
    return newDate.toISOString();
  };

  useEffect(() => {
    axios
      .get<Activity[]>(
        `http://api.route-master.org/plan/activity/list?planGroupId=${planGroupId}`,
      )
      .then((res) => {
        const newactivities = [...activities];
        res.data.forEach((activity) => {
          newactivities[getHour(activity.beginDate)] = activity;
        });
        dispatch(setActivities(newactivities));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDropComponent = (
    draggedActivity: Activity,
    targetLineId: number,
  ) => {
    console.log('handleDropComponent');
    const currentActivities = store.getState().activities;

    const targetActivity: Activity | undefined | object =
      currentActivities.find(
        (activity) => 'id' in activity && activity.id === draggedActivity.id,
      );

    // If targetActivity is empty object, throw error
    if (targetActivity === undefined || !('id' in targetActivity)) {
      throw new Error(
        'targetActivity is undefined in handleDropComponent: ',
        targetActivity,
      );
    }

    // 타겟 라인이 현재 라인과 다르면 업데이트
    const updatedActivity = { ...targetActivity } as Activity;

    const beginDate = getHour(updatedActivity.beginDate);
    if (targetLineId !== beginDate)
      updatedActivity.beginDate = updateHour(
        updatedActivity.beginDate,
        targetLineId,
      );

    const newActivities = currentActivities.map((activity) => {
      if (!('id' in activity) || activity.id !== draggedActivity.id)
        return activity;
      return {}; // activity이면서 id가 같은 경우
    });

    newActivities[targetLineId] = updatedActivity;
    dispatch(setActivities(newActivities));

    // post and delete
    const dataToSend = { ...updatedActivity };
    const dataToDelete = { ...targetActivity };

    axios
      .post('http://api.route-master.org/plan/activity', dataToSend)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    axios
      .delete('http://api.route-master.org/plan/activity', {
        data: dataToDelete,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_section}>
        <div className={styles.top}>
          <button className={styles.invite} type="button">
            그룹 초대
          </button>
          <Menu />
        </div>

        <PlanInfoBox />
        <Link to={`/calculate/${planGroupId}`}>
          <button type="button" className={styles.calculation_btn}>
            여행 정산하기
          </button>
        </Link>
      </div>
      <div className={styles.date_section}>
        <p>6월 1일 ~ 6월 30일</p>
      </div>
      <div className={styles.card_section}>
        <ul className={styles.line_container}>
          {activities.map((activity, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className={styles.li}>
              <DragTargetLine
                lineId={index}
                onDropComponent={handleDropComponent}
              />
              {'id' in activity ? (
                <div className={styles.activitycard_wrapper}>
                  <ActivityCard activity={activity} />
                </div>
              ) : (
                '\u00A0'
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlanColumn;
