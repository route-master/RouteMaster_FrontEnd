/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from 'store/store';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchPlan } from 'store/Slices/plans/thunks';
import { selectAttractionById } from 'store/Slices/attractions/slice';
import { addActivity, deleteActivity } from 'store/Slices/activities/thunks';
import Modal from 'components/Modal/Modal';
import AddPlanCardModalContent from 'components/AddPlanCard/ModalContent/ModalContent';
import styles from './ModalContent.module.css';

interface Props {
  setParentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contentId: number;
  isAdded: boolean;
}

function LikeBtnModal({
  setParentModalOpen,
  contentId,
  isAdded,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.plans.plans);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { pagetype } = useParams<{
    pagetype: 'stay' | 'event' | 'restaurant';
  }>();
  const header = {
    'Content-Type': 'application/json',
    'Allow-Access-Control': 'http://34.64.158.170:30000',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };

  useEffect(() => {
    dispatch(fetchPlan());
  }, [dispatch]);

  const addPlan = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const targetAttraction = useAppSelector((state: RootState) =>
    selectAttractionById(state, contentId),
  );

  const handleAddActivity = (planId: string) => {
    // Get info
    const myBeginDate = plans.filter((plan) => plan.id === planId)[0].beginDate;
    const myEndDate = plans.filter((plan) => plan.id === planId)[0].endDate;
    let myActivityType: 'HOTEL' | 'ACTIVITY' | 'RESTAURANT';
    if (pagetype === 'stay') myActivityType = 'HOTEL';
    else if (pagetype === 'event') myActivityType = 'ACTIVITY';
    else myActivityType = 'RESTAURANT';

    if (targetAttraction)
      dispatch(
        addActivity({
          activityObj: {
            planGroupId: planId,
            name: targetAttraction.title,
            description: targetAttraction.address,
            beginDate: myBeginDate,
            endDate: myEndDate,
            mapInfo: {
              lat: targetAttraction.mapY,
              lng: targetAttraction.mapX,
            },
            activityType: myActivityType,
            referenceType: 'TOUR_API',
            referenceId: targetAttraction.contentId.toString(),
          },
        }),
      );
  };

  const removeActivity = (id: string) => {
    // Get activities
    axios
      .get(`http://api.route-master.org/plan/activity/planGroupId=${id}`, {
        headers: header,
      })
      .then((res) => {
        const activities = res.data;
        // Delete activity
        const targetActivity = activities.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (activity: any) => activity.referenceId === contentId.toString(),
        );
        axios
          .delete(
            `http://api.route-master.org/plan/activity/${targetActivity[0].id}`,
            {
              headers: header,
            },
          )
          .then(() => {
            setModalOpen(true);
            document.body.style.overflow = 'hidden';
            console.log('delete success');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, id: string) => {
    if (!isAdded) handleAddActivity(id);
    else removeActivity(id);
    setParentModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>My Plans</h2>
        <ul className={styles.planlist}>
          {plans &&
            plans.map((plan) => (
              <li key={plan.id} onClick={(e) => handleClick(e, plan.id)}>
                {plan.name}
              </li>
            ))}
        </ul>
        {!isAdded && (
          <button
            type="button"
            onClick={(e) => addPlan(e)}
            className={styles.addbtn}
          >
            플랜 추가하기
          </button>
        )}
        {modalOpen && (
          <Modal
            Content={<AddPlanCardModalContent setModalOpen={setModalOpen} />}
            setModalOpen={setModalOpen}
            mywidth="700px"
            myheight="450px"
          />
        )}
      </div>
    </div>
  );
}

export default LikeBtnModal;
