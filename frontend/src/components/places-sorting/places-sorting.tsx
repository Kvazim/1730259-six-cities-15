import cn from 'classnames';
import { DEFAULT_ZERO, SortType } from '../../const';
import { RefObject, memo, useEffect, useRef, useState } from 'react';

type PlacesSortingProps ={
  currentSort: SortType;
  onChangeSort: (sortType: SortType) => void;
}

function PlacesSorting({currentSort, onChangeSort}: PlacesSortingProps): JSX.Element {
  const [isOpenSorting, setIsOpenSorting] = useState(false);
  const sortRef: RefObject<HTMLSpanElement> = useRef(null);

  useEffect(() => {
    const closeSort = (evt: MouseEvent) => {
      if (!sortRef.current || !(evt.target instanceof HTMLElement)) {
        return;
      }

      if (!sortRef.current.contains(evt.target)) {
        setIsOpenSorting(false);
      }
    };

    document.addEventListener('click', closeSort);

    return () => document.removeEventListener('click', closeSort);
  }, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={DEFAULT_ZERO} onClick={() => setIsOpenSorting(!isOpenSorting)} ref={sortRef}>
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpenSorting ? 'places__options--opened' : ''}`}>
        {
          Object.values(SortType).map((type) => (
            <li
              key={type}
              className={
                cn(
                  'places__option',
                  { 'places__option--active': currentSort === type }
                )
              }
              tabIndex={DEFAULT_ZERO}
              onClick={() => onChangeSort(type)}
            >
              {type}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

const MemoizedPlacesSorting = memo(PlacesSorting);

export default MemoizedPlacesSorting;
