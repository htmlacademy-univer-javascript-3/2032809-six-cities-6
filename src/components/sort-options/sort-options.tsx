import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType, type SortType } from '../../store/action';
import type { RootState } from '../../store/index';

const SORT_OPTIONS: SortType[] = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

function SortOptions(): JSX.Element {
  const dispatch = useDispatch();
  const currentSort = useSelector((state: RootState) => state.sortType);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = (sortType: SortType) => {
    dispatch(setSortType(sortType));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTIONS.map((option) => (
          <li
            key={option}
            className={`places__option ${currentSort === option ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortOptions;

