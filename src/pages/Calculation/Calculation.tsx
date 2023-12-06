/* eslint-disable no-console */
/* eslint-disable no-alert */
import { useAppSelector } from 'store/hooks';
import { selectPlanById } from 'store/Slices/plans/slice';
import { RootState } from 'store/store';
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
  const { planGroupId } = useParams<{ planGroupId: string }>();
  const [data, setData] = useState<CalcObject[]>([]);
  const [total, setTotal] = useState<number>(0);
  const myname = 'test';

  const plan = useAppSelector(
    (state: RootState) => planGroupId && selectPlanById(state, planGroupId),
  );

  // 정산 리스트 데이터 받아오기
  useEffect(() => {
    const header = {
      'Content-Type': 'application/json',
      'Allow-Access-Control': 'http://34.64.158.170:3000',
      Athorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };

    axios
      .get(`/calculate?planGroupId=${planGroupId}`, {
        headers: header,
      })
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
      {plan && <TotalPrice title={plan.name} price={total} />}
      {data ? <PriceList data={data} /> : <div> 정산할 비용이 없습니다. </div>}
      <div>
        <CalButton handleClick={handleCalculation} />
      </div>
    </div>
  );
}

export default Calculation;
