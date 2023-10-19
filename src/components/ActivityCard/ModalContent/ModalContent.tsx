/* eslint-disable no-console */
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import LogItem from './LogItem/LogItem';
import styles from './ModalContent.module.css';

interface PlanObj {
  createdAt: string;
  updatedAt: string;
  id: string;
  writer: string;
  name: string;
  description: string;
  thumbnailimageUrl: string;
  participants: string[];
  beginDate: string;
  endDate: string;
}

interface PaymentLogs {
  paymentLogs: Log[];
}
interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

interface Props {
  id: string;
  paymentInfo: PaymentLogs;
}

function ActivityCardModal({ id, paymentInfo }: Props): JSX.Element {
  const { planGroupId } = useParams<{ planGroupId: string }>();
  const [member, setMember] = useState<string[]>([]);
  const [logs, setLogs] = useState<Log[]>([
    { paid: '', participants: [], payment: 0 },
  ]);
  const paymentRefs = useRef<React.RefObject<HTMLInputElement>[]>([
    React.createRef(),
  ]);
  const header = {
    'Content-Type': 'application/json',
    'Allow-Access-Control': 'http://34.64.158.170:30000',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };

  const handleSubmit = () => {
    const updatedLogs = logs.map((log, index) => ({
      ...log,
      payment: parseInt(paymentRefs.current[index]?.current?.value ?? '0', 10),
    }));

    const activityId = id;
    axios
      .post('http://api.route-master.org/plan/activity/payment', {
        headers: header,
        data: {
          id: activityId,
          // eslint-disable-next-line object-shorthand
          logs: updatedLogs,
        },
      })
      .catch((err) => console.log(err));
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

  useEffect(() => {
    const { paymentLogs } = paymentInfo;
    setLogs(paymentLogs);

    // Get participants from plan group
    axios
      .get<PlanObj>(`http://api.route-master.org/plan/group/${planGroupId}`, {
        headers: header,
      })
      .then((res) => {
        setMember(res.data.participants);
      })
      .catch((err) => {
        // test data
        setMember(['test1', 'test2', 'test3']);
        console.log(err);
      });
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
