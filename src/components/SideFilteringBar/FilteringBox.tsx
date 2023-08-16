import styles from './FilteringBox.module.css';

interface Props {
  category: string;
  options: string[];
}

function FilteringBox({ category, options }: Props): JSX.Element {
  const checkboxes = options.map((option) => {
    return (
      <div key={option} className={styles.checkbox_container}>
        <input type="checkbox" id={option} className={styles.checkbox} />
        <label className={styles.label} htmlFor={option}>
          {option}
        </label>
      </div>
    );
  });
  return (
    <div className={styles.container}>
      <h3> {category} </h3>
      {checkboxes}
    </div>
  );
}

export default FilteringBox;
