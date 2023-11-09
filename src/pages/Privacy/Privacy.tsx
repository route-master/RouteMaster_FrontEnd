import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Privacy.module.css';

interface TermsOfUse {
  id: string;
  name: string;
  description: string;
  type: string;
  privacies: Privacy[];
  expiresDays: number;
}

interface Privacy {
  id: string;
  name: string;
  description: string;
  priority: number;
  createdAt: string;
  updatedAt: string | null;
}

function Privacy(): JSX.Element {
  const [privacy, setPrivacy] = useState<TermsOfUse>();
  const navigatate = useNavigate();

  useEffect(() => {
    axios
      .get('http://auth.route-master.org/v1/privacy/all')
      .then((res) => {
        setPrivacy(res.data.privacyGroups[0]);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const agreed = formData.get('agreement') === '동의함';

    if (!agreed) {
      // eslint-disable-next-line no-alert
      alert('약관 동의가 완료되어야 다음 단계로 넘어갈 수 있습니다.');
    } else {
      navigatate('/register');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}> {privacy?.name}(Terms of Use) </h1>
      <h3 className={styles.desc}> {privacy?.description} </h3>
      <div className={styles.privacy_container}>
        {privacy &&
          privacy.privacies.map((item, i) => {
            return (
              <div key={item.id} className={styles.privacy_wrapper}>
                <h3 className={styles.section_header}>
                  {i + 1}. {item.name}
                </h3>
                <div className={styles.content}> {item.description} </div>
              </div>
            );
          })}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.radio_container}>
          <div>
            <input
              type="radio"
              id="agree"
              name="agreement"
              value="동의함"
              required
            />
            <label htmlFor="agree"> 동의함 </label>
          </div>
          <div>
            <input
              type="radio"
              id="disagree"
              name="agreement"
              value="동의안함"
            />
            <label htmlFor="disagree"> 동의안함 </label>
          </div>
        </div>
        <button type="submit" className={styles.nextbtn}>
          다음으로
        </button>
      </form>
    </div>
  );
}

export default Privacy;
