import { useSearchParams } from 'react-router-dom';
import { Cities, CITY } from '../../../../shared/lib/const/const';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/redux';
import { getCurrentCity, setCurrentCity } from '../../model';
import { useEffect } from 'react';

export const useCitySync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCity = useAppSelector(getCurrentCity);
  const dispatch = useAppDispatch();
  const cityQuery = searchParams.get(CITY) as Cities;

  useEffect(() => {
    if (!cityQuery) {
      searchParams.set(CITY, currentCity);
      setSearchParams(searchParams);
    }

    if (cityQuery) {
      dispatch(setCurrentCity(cityQuery));
    }
  }, [cityQuery, currentCity, dispatch, searchParams, setSearchParams]);
};
