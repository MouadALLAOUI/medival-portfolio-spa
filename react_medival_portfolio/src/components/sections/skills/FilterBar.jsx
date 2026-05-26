import styles from './FilterBar.module.scss';

const FilterBar = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className={styles['filter-bar']} aria-label="Category filter">
      {filters.map((filter) => (
        <button
          key={filter.key}
          className={`${styles['filter-btn']} ${activeFilter === filter.key ? styles['active'] : ''}`}
          type="button"
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
