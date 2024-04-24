import styles from './FilteringBox.module.css';

interface Props {
  category: string;
  options: string[];
  selectedFilters: string[];
  onFilterChange: (category: string, selectedFilters: string[]) => void;
}

function FilteringBox({
  category,
  options,
  selectedFilters,
  onFilterChange,
}: Props): JSX.Element {
  const handleCheckboxChange = (option: string) => {
    let updatedFilters = [...selectedFilters];
    if (updatedFilters.includes(option)) {
      updatedFilters = updatedFilters.filter((filter) => filter !== option);
    } else {
      updatedFilters.push(option);
    }
    onFilterChange(category, updatedFilters);
  };
  const checkboxes = options.map((option) => {
    return (
      <div key={option} className={styles.checkbox_container}>
        <input
          type="checkbox"
          id={option}
          className={styles.checkbox}
          checked={selectedFilters.includes(option)}
          onChange={() => handleCheckboxChange(option)}
        />
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
