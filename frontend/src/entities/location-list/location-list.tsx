import { memo } from 'react';
import MemoizedLocationItem from '../../shared/ui/location-item/location-item';
import { Cities } from '../../shared/lib/const/const';
import { useAppSelector } from '../../shared/lib/redux';
import { getCurrentCity } from './model';
import { useCitySync } from './lib';

function LocationList() {
  const currentCity = useAppSelector(getCurrentCity);

  useCitySync();

  return (
    <ul className="locations__list tabs__list">
      {
        Object.values(Cities).map(
          (city) => <MemoizedLocationItem key={city} isTabs city={city} isActive={currentCity === city} />
        )
      }
    </ul>
  );
}

const MemoizedLocationList = memo(LocationList);

export {MemoizedLocationList};
