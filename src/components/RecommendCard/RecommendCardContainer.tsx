import RecommendCard from './RecommendCard';
import styles from './RecommendCardContainer.module.css';

interface Props {
  title: string;
}

function RecommendCardContainer({ title }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.cards_wrapper}>
        <div className={styles.cards}>
          <RecommendCard imgsrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJ8JZ8u08TaNV65bLluIMKs14K5b5hyKttw&usqp=CAU" />
          <RecommendCard imgsrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJ8JZ8u08TaNV65bLluIMKs14K5b5hyKttw&usqp=CAU" />
          <RecommendCard imgsrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJ8JZ8u08TaNV65bLluIMKs14K5b5hyKttw&usqp=CAU" />
          <RecommendCard imgsrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJ8JZ8u08TaNV65bLluIMKs14K5b5hyKttw&usqp=CAU" />
        </div>
      </div>
    </div>
  );
}

export default RecommendCardContainer;
