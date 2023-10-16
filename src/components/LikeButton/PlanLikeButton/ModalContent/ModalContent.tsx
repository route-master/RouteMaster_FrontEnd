/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchPlan } from 'store/Slices/plans/thunks';
import Modal from 'components/Modal/Modal';
import AddPlanCardModalContent from 'components/AddPlanCard/ModalContent/ModalContent';
import styles from './ModalContent.module.css';

interface Props {
  type: string;
  contentId: number;
  setIsListClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Attraction {
  title: string;
  largeCategory: string;
  mediumCategory: string;
  smallCategory: string;
  mapX: number;
  mapY: number;
  areaCode: number;
  sigunguCode: number;
  mapLevel: number;
  address: string;
  detailAddress: string;
  contentId: number;
  contentTypeId: number;
  copyrightType: string;
  image: string;
  thumbnailImage: string;
  createdTime: string;
  modifiedTime: string;
  bookTour: boolean;
  tel: string;
  benikia: boolean;
  goodStay: boolean;
  hanok: boolean;
}
interface Response {
  resultcode: string;
  resultMessage: string;
  attractions: Attraction[];
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

function LikeBtnModal({
  contentId,
  type,
  setIsListClicked,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { plans } = useAppSelector((state) => state.plans);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { pagetype } = useParams<{ pagetype: string }>();

  useEffect(() => {
    if (!plans) {
      dispatch(fetchPlan());
    }
  }, []);

  const addPlan = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const addActivity = (id: string) => {
    // Get attraction
    axios
      .get<Response>(
        `http://api.route-master.org/attraction/detail/common/contentId=${contentId}`,
      )
      .then((res) => {
        const attraction = { ...res.data.attractions[0] };
        const myBeginDate = plans.filter((plan) => plan.id === id)[0].beginDate;
        const myEndDate = plans.filter((plan) => plan.id === id)[0].endDate;
        // Post activity
        axios
          .post(`http://api.route-master.org/plan/activity`, {
            id: null,
            planGroupId: id,
            name: attraction.title,
            description: attraction.address,
            beginDate: myBeginDate,
            endDate: myEndDate,
            mapInfo: {
              lat: attraction.mapY,
              lng: attraction.mapX,
            },
            activityType: pagetype?.toUpperCase(),
            referenceType: 'TOUR_API',
            referenceId: attraction.contentId.toString(),
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeActivity = (id: string) => {
    // Get activities
    axios
      .get(`http://api.route-master.org/plan/activity/planGroupId=${id}`)
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
          )
          .then(() => {
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
    e.stopPropagation();
    e.preventDefault();
    if (type === 'add') addActivity(id);
    else removeActivity(id);
    setIsListClicked(true);
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
        {type === 'add' && (
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
