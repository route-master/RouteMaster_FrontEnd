/* eslint-disable no-console */
/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PriceList from 'components/PriceList/PriceList';
import TotalPrice from 'components/TotalPrice/TotalPrice';
import CalButton from 'components/CalButton/CalButton';
import styles from './Calculation.module.css';

type CalcObject = {
  sender: string;
  receiver: string;
  amount: number;
};

function Calculation(): JSX.Element {
  const planGroupId = useParams().id;
  const [data, setData] = useState<CalcObject[]>([]);
  const [total, setTotal] = useState<number>(0);
  const myname = 'test';
  const testData = [
    {
      sender: 'test',
      receiver: 'test2',
      amount: 10000,
    },
    {
      sender: 'test',
      receiver: 'test3',
      amount: 1012456000,
    },
  ];

  useEffect(() => {
    // planGroupId를 이용해서 title 받아옴
  }, []);

  // 정산 리스트 데이터 받아오기
  useEffect(() => {
    axios
      .get(`/calculate?planGroupId=${planGroupId}}`)
      .then((res) => {
        const fetchedData: CalcObject[] = res.data.calulated;
        fetchedData.forEach((item) => {
          if (item.sender === myname) {
            setData([...data, item]);
          }
        });
        setTotal(data.reduce((sum, item) => sum + item.amount, 0));
        console.log(total);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  type failureInfo = {
    code: number;
    msg: string;
    receiverUuids: string[];
  };
  type kakaoRes = {
    successfulReceiverUuids: string[];
    failureInfo: failureInfo;
  };
  type calRes = {
    kakaoResponse: kakaoRes;
  };
  const handleCalculation = () => {
    axios
      .get<calRes>(`/calculate/kakao/send?planGroupId=${planGroupId}}`)
      .then((res) => {
        console.log(res.data);
        const result = res.data.kakaoResponse;
        if (result.successfulReceiverUuids.length > 0)
          alert('정산이 완료되었습니다.');
        else {
          const uuidStrings = result.failureInfo.receiverUuids;
          alert(
            `정산에 실패했습니다. 실패한 친구들 목록: ${uuidStrings.toString()}`,
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <TotalPrice title="hihi" price={total} />
      <PriceList data={testData} />
      <CalButton handleClick={handleCalculation} />
    </div>
  );
}

export default Calculation;
