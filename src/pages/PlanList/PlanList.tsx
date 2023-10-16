import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { fetchPlan } from 'store/Slices/plans/thunks';

import AddPlanCard from 'components/AddPlanCard/AddPlanCard';
import PlanCard from 'components/PlanCard/PlanCard';
import styles from './PlanList.module.css';

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
        {plans.map((p) => (
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
