/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { fetchPlan, postPlan } from 'store/Slices/plans/thunks';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './ModalContent.module.css';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modalcontent({ setModalOpen }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>();
  const [desc, setDesc] = useState<string>('');
  const [beginDateInput, setBeginDateInput] = useState<Date>();
  const [endDateInput, setEndDateInput] = useState<Date>();

  const handleSubmit = () => {
    if (!title) {
      alert('여행 이름을 입력해주세요');
      return;
    }
    if (!beginDateInput || !endDateInput) {
      alert('날짜를 선택해주세요');
      return;
    }
    if (beginDateInput > endDateInput) {
      alert('시작 날짜가 더 빠를 수 없습니다');
      return;
    }

    const data = {
      id: null,
      name: title,
      description: desc,
      thumbnailImageUrl: null,
      beginDate: beginDateInput.toISOString(),
      endDate: endDateInput.toISOString(),
    };

    dispatch(postPlan({ planObj: data })).then(() => dispatch(fetchPlan()));
    setModalOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h2>플랜 추가</h2>
      <form action="" className={styles.form}>
        <div>
          <label htmlFor="title">여행 이름</label>
          <input
            type="text"
            name="title"
            id="title"
            className={styles.title_input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">여행 설명(Optional)</label>
          <input
            type="text"
            name="description"
            id="description"
            className={styles.desc_input}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div>
          <div>여행 일정 선택</div>
          <div className={styles.datepickers_wrapper} onClick={handleClick}>
            <DatePicker
              aria-labelledby="beginDateLabel"
              id="beginDate"
              showIcon
              dateFormat="yyyy-MM-dd"
              selectsStart
              selected={beginDateInput}
              endDate={endDateInput}
              calendarClassName={styles.calendar}
              onChange={(date: Date) => setBeginDateInput(date)}
            />
            -
            <DatePicker
              aria-labelledby="endDateLabel"
              id="endDate"
              showIcon
              dateFormat="yyyy-MM-dd"
              selected={endDateInput}
              minDate={beginDateInput}
              startDate={beginDateInput}
              endDate={endDateInput}
              calendarClassName={styles.calendar}
              onChange={(date: Date) => setEndDateInput(date)}
              selectsEnd
            />
          </div>
        </div>
        <button
          type="button"
          value="submit"
          className={styles.submit_btn}
          onClick={handleSubmit}
        >
          생성
        </button>
      </form>
    </div>
  );
}

export default Modalcontent;
