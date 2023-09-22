import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import store, { RootState } from 'store/store';
import { setActivities } from 'store/Slices/activitiesSlice';

import PlanInfoBox from './PlanInfoBox/PlanInfoBox';
import ActivityCard from '../ActivityCard/ActivityCard';
import DragTargetLine from './DragTargetLine/DragTargetLine';
import styles from './PlanColumn.module.css';

interface Activity {
  id?: number;
  planGroupId: number;
  name: string;
  description?: string;
  beginDate: number;
  endDate: number;
  type: string;
  planMapInfo?: object;
  thumbnailImageUrl: string;
  planPaymentLog?: object[];
}

const testData: Activity[] = [
  {
    id: 1,
    planGroupId: 1,
    name: '1',
    description: '1',
    beginDate: 12,
    endDate: 14,
    type: 'hotel',
    planMapInfo: { lat: 37.5, lng: 127.5 },
    thumbnailImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS56QpW4f453ZbCRrFu2yMwkkIJZEUmXgKYvw&usqp=CAU',
    planPaymentLog: [],
  },
  {
    id: 2,
    planGroupId: 1,
    name: '2',
    beginDate: 16,
    endDate: 17,
    type: 'attraction',
    thumbnailImageUrl:
      'https://www.hyundai.co.kr/image/upload/asset_library/MDA00000000000033649/8e6daec8a90247c38f41913257586aff.jpg',
  },
  {
    id: 3,
    planGroupId: 1,
    name: '3',
    beginDate: 17,
    endDate: 18,
    type: 'restaurant',
    thumbnailImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/640px-Restaurant_N%C3%A4sinneula.jpg',
  },
];

function PlanColumn(): JSX.Element {
  const dispatch = useDispatch();
  const activities = useSelector((state: RootState) => state.activities);

  const planId = 0;

  useEffect(() => {
    const fetchData = async () => {
      const data: [] = await axios.get(
        `/plan/activity/list?planGroupId=${planId}&username=test`,
      );
      return [];
    };

    try {
      fetchData().then((data) => {
        const newactivities = [...activities];
        testData.forEach((activity) => {
          newactivities[activity.beginDate] = activity;
        });
        dispatch(setActivities(newactivities));
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleDropComponent = (
    draggedActivity: Activity,
    targetLineId: number,
  ) => {
    const currentActivities = store.getState().activities;

    const targetActivity: Activity | undefined | object =
      currentActivities.find(
        (activity) => 'id' in activity && activity.id === draggedActivity.id,
      );

    if (!targetActivity) {
      throw new Error('updatedActivity is undefined in handleDropComponent');
    }

    // 타겟 라인이 현재 라인과 다르면 업데이트
    const updatedActivity = { ...targetActivity };
    if (targetLineId !== updatedActivity.beginDate)
      updatedActivity.beginDate = targetLineId;

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
      .post('/plan/activity', dataToSend)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    axios
      .delete('/plan/activity', { data: dataToDelete })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_section}>
        <button className={styles.invite} type="button">
          그룹 초대
        </button>
        <PlanInfoBox />
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
