import { memo } from 'react';
import { Cities } from '../../shared/lib/const/const';
import { getRandomArrayItem } from '../../shared/lib/utils/utils';
import MemoizedLocationItem from '../../shared/ui/location-item/location-item';

function RandomCity () {
  const city = getRandomArrayItem<Cities>(Object.values(Cities));
  return (
    <section className="locations locations--login locations--current">
      <MemoizedLocationItem city={city} />
    </section>
  );
}

const MemoizedRandomCity = memo(RandomCity);

export { MemoizedRandomCity };
