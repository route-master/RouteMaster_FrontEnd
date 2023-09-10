import { useEffect, useState } from 'react';
import axios from 'axios';
import PlanInfoBox from './PlanInfoBox/PlanInfoBox';
import ActivityCard from '../ActivityCard/ActivityCard';
import styles from './PlanColumn.module.css';

interface Activity {
  planGroupId: number;
  title: string;
  startTime: number;
  endTime: number;
  type: string;
  imgsrc: string;
}

function PlanColumn(): JSX.Element {
  const [activities, setActivities] = useState<(Activity | object)[]>(
    Array(24).fill({}),
  );
  const planId = 0;
  const testData: Activity[] = [
    {
      planGroupId: 1,
      title: '1',
      startTime: 12,
      endTime: 14,
      type: 'hotel',
      imgsrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS56QpW4f453ZbCRrFu2yMwkkIJZEUmXgKYvw&usqp=CAU',
    },
    {
      planGroupId: 2,
      title: '2',
      startTime: 16,
      endTime: 17,
      type: 'attraction',
      imgsrc:
        'https://www.hyundai.co.kr/image/upload/asset_library/MDA00000000000033649/8e6daec8a90247c38f41913257586aff.jpg',
    },
    {
      planGroupId: 3,
      title: '3',
      startTime: 17,
      endTime: 18,
      type: 'restaurant',
      imgsrc:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/640px-Restaurant_N%C3%A4sinneula.jpg',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data: [] = await axios.get(
        `/plan/activity/list?planGroupId=${planId}&username=test`,
      );
      return [];
    };

    try {
      fetchData().then(data => {
        const newactivities = [...activities];
        testData.forEach((activity) => {
          newactivities[activity.startTime] = activity;
        });

        setActivities(newactivities);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

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
            <li key={index} className={styles.line_wrapper}>
              <span className={styles.number}>{index}</span>
              <div className={styles.line}>
                {'planGroupId' in activity ? (
                  <div className={styles.activitycard}>
                    <ActivityCard {...activity} />
                  </div>
                ) : (
                  '\u00A0'
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlanColumn;
