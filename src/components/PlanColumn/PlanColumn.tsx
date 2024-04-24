/* eslint-disable no-console */
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import store, { RootState } from 'store/store';
import { selectPlanById } from 'store/Slices/plans/slice';
import { setActivities } from 'store/Slices/activities/slice';
import { fetchActivities, addActivity } from 'store/Slices/activities/thunks';
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
  activityType: 'HOTEL' | 'RESTAURANT' | 'ACTIVITY' | 'UNKNOWN';
  paymentInfo: PaymentLogs;
  referenceType: 'TOUR_API' | 'KAKAO_MAP';
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
  const { planGroupId } = useParams<{ planGroupId: string }>();

  const plan = useAppSelector((state: RootState) =>
    planGroupId ? selectPlanById(state, planGroupId) : null,
  );

  const getHour = (date: string) => {
    const hour = new Date(date).getHours();
    return hour;
  };
  const updateHour = (date: string, hour: number) => {
    const newDate = new Date(date);
    newDate.setUTCHours(hour); // Use UTC function because of toISOString
    return newDate.toISOString();
  };

  useEffect(() => {
    if (planGroupId) dispatch(fetchActivities({ id: planGroupId }));
  }, [dispatch, planGroupId]);

  const activities = useAppSelector(
    (state: RootState) => state.activities.activities,
  );

  const handleDropComponent = (
    draggedActivity: Activity,
    targetLineId: number,
  ) => {
    const currentActivities = store.getState().activities.activities;
    console.log(currentActivities);
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

    // Update activities if the target line is not a current line
    const updatedActivity = { ...targetActivity } as Activity;

    const beginDate = getHour(updatedActivity.beginDate);
    if (targetLineId !== beginDate) {
      updatedActivity.beginDate = updateHour(
        updatedActivity.beginDate,
        targetLineId,
      );
      updatedActivity.endDate = updateHour(
        updatedActivity.beginDate,
        targetLineId + 1,
      );
    }

    const newActivities = currentActivities.map((activity) => {
      if (!('id' in activity) || activity.id !== draggedActivity.id)
        return activity;
      return {}; // activity이면서 id가 같은 경우
    });

    newActivities[targetLineId] = updatedActivity;

    dispatch(setActivities(newActivities));

    // Make a post request
    const dataToSend = { ...updatedActivity };

    dispatch(addActivity({ activityObj: dataToSend })).then(() => {
      if (planGroupId) dispatch(fetchActivities({ id: planGroupId }));
    });
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
          {activities &&
            activities.map((activity, index) => (
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
