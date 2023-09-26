import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { fetchPlan } from 'store/Slices/plans/thunks';

import AddPlanCard from 'components/AddPlanCard/AddPlanCard';
import PlanCard from 'components/PlanCard/PlanCard';
import styles from './PlanList.module.css';

interface PlanObj {
  createdAt: string;
  updatedAt: string;
  id: number;
  writer: string;
  name: string;
  description: string;
  thumbnailimageUrl: string;
  participants: string[];
  beginDate: string;
  endDate: string;
}

const testData: PlanObj[] = [
  {
    createdAt: '2021-08-16T14:00:00.000Z',
    updatedAt: '2021-08-16T14:00:00.000Z',
    id: 1,
    writer: 'me',
    name: 'hi',
    description: 'desc',
    thumbnailimageUrl: 'https://picsum.photos/200',
    participants: ['a', 'b', 'c'],
    beginDate: '2021-08-16T14:00:00.000Z',
    endDate: '2021-08-17T14:00:00.000Z',
  },
  {
    createdAt: '2021-08-16T14:00:00.000Z',
    updatedAt: '2021-08-16T14:00:00.000Z',
    id: 2,
    writer: 'me',
    name: 'hihi',
    description: 'desc',
    thumbnailimageUrl: '',
    participants: ['a', 'b', 'c'],
    beginDate: '2023-08-16T14:00:00.000Z',
    endDate: '2023-08-17T14:00:00.000Z',
  },
];

function PlanList(): JSX.Element {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state: RootState) => state.plans.plans);

  useEffect(() => {
    // add fetch func later
    dispatch(fetchPlan());
  }, []);

  return (
    <div className={styles.container}>
      <h1>PlanList</h1>
      <div className={styles.grid}>
        <div className={styles.make_plan}>
          <AddPlanCard />
        </div>
        {testData.map((p: PlanObj) => (
          <Link to={`/plan-list/plan/${p.id}`} key={p.id}>
            <PlanCard
              key={p.id}
              title={p.name}
              writer={p.writer}
              participants={p.participants}
              imgsrc={p.thumbnailimageUrl}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PlanList;
