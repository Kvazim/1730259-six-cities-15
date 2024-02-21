import cn from 'classnames';
import { DEFAULT_SORT, SortType } from '../../const';
import { RefObject, useEffect, useRef, useState } from 'react';

function PlacesSorting(): JSX.Element {
  const [isOpenSorting, setIsOpenSorting] = useState(false);
  const sortRef: RefObject<HTMLSpanElement> = useRef(null);
  const sortType = DEFAULT_SORT;

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
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpenSorting(!isOpenSorting)} ref={sortRef}>
        {sortType}
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
                  { 'places__option--active': sortType === type }
                )
              }
              tabIndex={0}
            >
              {type}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default PlacesSorting;