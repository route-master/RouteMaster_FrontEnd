/* eslint-disable no-console */
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPlanById } from 'store/Slices/plans/slice';
import { getNickNamesById } from 'store/Slices/users/thunks';
import { postLogs } from 'store/Slices/paymentLogs/thunks';
import { RootState } from 'store/store';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import LogItem from './LogItem/LogItem';
import styles from './ModalContent.module.css';

interface PaymentLogs {
  paymentLogs: Log[];
}
interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

interface Props {
  activityId: string;
  paymentInfo: PaymentLogs;
}

function ActivityCardModal({ activityId, paymentInfo }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { planGroupId } = useParams<{ planGroupId: string }>();
  const [member, setMember] = useState<{ id: string; nickname: string }[]>([]);
  const [logs, setLogs] = useState<Log[]>([
    { paid: '', participants: [], payment: 0 },
  ]);
  const paymentRefs = useRef<React.RefObject<HTMLInputElement>[]>([
    React.createRef(),
  ]);

  const handleSubmit = () => {
    const updatedLogs = logs.map((log, index) => ({
      ...log,
      payment: parseInt(paymentRefs.current[index]?.current?.value ?? '0', 10),
    }));

    dispatch(postLogs({ logs: updatedLogs, id: activityId }));
  };

  const addLog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    paymentRefs.current.push(React.createRef());
    setLogs([...logs, { paid: '', participants: [], payment: 0 }]);
  };

  const updateLog = (index: number, updatedLog: Log) => {
    setLogs((prevLogs) => {
      const newLogs = [...prevLogs];
      newLogs[index] = updatedLog;
      return newLogs;
    });
  };

  const fetchedPlan = useAppSelector((state: RootState) =>
    planGroupId ? selectPlanById(state, planGroupId) : null,
  );

  useEffect(() => {
    const { paymentLogs } = paymentInfo;
    setLogs(paymentLogs);

    // Get participants' nicknames from plan group
    if (fetchedPlan) {
      dispatch(getNickNamesById({ ids: fetchedPlan?.participants }))
        .unwrap()
        .then((res) => {
          const members = res.nicknames.map(
            (nickObj: { id: string; baseUserId: string; nickname: string }) => {
              return {
                id: nickObj.baseUserId,
                nickname: nickObj.nickname,
              };
            },
          );
          setMember(members);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1> 정산하기 </h1>
      <ul className={styles.loglist}>
        {member &&
          logs.map((log, index) => (
            <li key={Math.floor(Math.random() * 10000)}>
              <LogItem
                members={member}
                currentLog={log}
                index={index}
                handleChange={updateLog}
                paymentRef={paymentRefs.current[index]}
              />
            </li>
          ))}
      </ul>
      <div className={styles.btn_group}>
        <button type="button" onClick={addLog} className={styles.addbtn}>
          +
        </button>
        <button type="button" onClick={handleSubmit} className={styles.submit}>
          저장
        </button>
      </div>
      <div className={styles.alert}>
        * 본인의 몫까지 지불했을 경우 본인도 선택해주세요!
      </div>
    </div>
  );
}

export default ActivityCardModal;
