import { useSearchParams } from 'react-router-dom';
import { SORT_TYPE, SortType } from '../../../../shared/lib/const/const';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/redux';
import { getSortingType, setSortingType } from '../../model';
import { useEffect } from 'react';

export const useSortTypeSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortingType = useAppSelector(getSortingType);
  const dispatch = useAppDispatch();
  const sortingQuery = searchParams.get(SORT_TYPE) as SortType;

  const updateSortType = (newType: SortType) => {
    dispatch(setSortingType(newType));
    searchParams.set(SORT_TYPE, newType);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!sortingQuery) {
      searchParams.set(SORT_TYPE, currentSortingType);
      setSearchParams(searchParams);
    }

    if (sortingQuery) {
      dispatch(setSortingType(sortingQuery));
    }
  }, [sortingQuery, currentSortingType, dispatch, searchParams, setSearchParams]);

  return {
    updateSortType
  };
};
