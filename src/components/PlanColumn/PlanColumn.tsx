/* eslint-disable no-console */
import { useEffect } from 'react';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import store, { RootState } from 'store/store';
import { selectPlanById } from 'store/Slices/plans/slice';
import { setActivities } from 'store/Slices/activitiesSlice';
import { useParams } from 'react-router-dom';

import AvatarGroup from 'components/CustomAvatarGroup/CustomAvatarGroup';
import ActivityCard from 'components/ActivityCard/ActivityCard';
import Menu from './Menu/Menu';
import PlanInfoBox from './PlanInfoBox/PlanInfoBox';
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
  const dispatch = useAppDispatch();
  const activities = useAppSelector((state: RootState) => state.activities);
  const header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };

  const { planGroupId } = useParams<{ planGroupId: string }>();
  const plan = useAppSelector((state: RootState) =>
    planGroupId ? selectPlanById(state, planGroupId) : null,
  );

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
        { headers: header },
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
      .post('http://api.route-master.org/plan/activity', {
        headers: header,
        data: dataToSend,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    axios
      .delete('http://api.route-master.org/plan/activity', {
        headers: header,
        data: dataToDelete,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const getYYYYMMDD = (date: string) => {
    return date.split('T')[0];
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_section}>
        <div className={styles.top}>
          <AvatarGroup />
          <Menu />
        </div>
        <PlanInfoBox title={plan?.name || ''} writer={plan?.writer || ''} />
      </div>
      <div className={styles.date_section}>
        <p>
          <b>{plan && getYYYYMMDD(plan.beginDate)}</b>
          {' - '}
          <b>{plan && getYYYYMMDD(plan.endDate)}</b>
        </p>
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
