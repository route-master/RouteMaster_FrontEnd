import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPlanById } from 'store/Slices/plans/slice';
import { fetchPlan, joinPlan } from 'store/Slices/plans/thunks';
import { getNicknameById, getMyProfile } from 'store/Slices/users/thunks';
import { RootState } from 'store/store';
import styles from './Invite.module.css';

function Invite(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { planGroupId } = useParams<{ planGroupId: string }>();
  const [writer, setWriter] = useState('');

  useEffect(() => {
    // fetch plan data to show when logged in, navigate to login page when not
    if (localStorage.getItem('accessToken')) {
      dispatch(fetchPlan());
      dispatch(getMyProfile());
    } else {
      navigate('/login');
    }
  }, [dispatch]);

  const plan = planGroupId
    ? useAppSelector((state: RootState) => selectPlanById(state, planGroupId))
    : undefined;

  // fetch writer's nickname
  useEffect(() => {
    if (plan) {
      dispatch(getNicknameById(plan.writer))
        .unwrap()
        .then((data) => {
          setWriter(data.nickname);
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }
  }, [plan]);

  const profilesState = useAppSelector(
    (state) => state.profile.profiles[0]?.profile,
  );

  const handleAccept = () => {
    if (!plan || !planGroupId)
      throw new Error('plan is undefined. Check if plan is fetched correctly');

    dispatch(joinPlan({ id: profilesState?.baseUserId, planId: planGroupId }));
    navigate(`/plan-list/plan/${planGroupId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.content_wrapper}>
          <div className={styles.content}>
            <h2>{writer}님의 여행계획에 초대합니다!</h2>
            <table>
              <tbody>
                <tr>
                  <td>여행 이름:</td>
                  <td>{plan?.name}</td>
                </tr>
                <tr>
                  <td>작성자:</td>
                  <td>{writer}</td>
                </tr>
                <tr>
                  <td>여행 일자:</td>
                  <td>
                    {plan?.beginDate.substring(0, 10)}
                    <b> - </b>
                    {plan?.endDate.substring(0, 10)}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              className={styles.joinbtn}
              onClick={handleAccept}
            >
              초대 수락하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invite;
