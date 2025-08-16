import { memo } from 'react';
import { Cities } from '../../const';
import MemoizedLocationItem from '../location-item/location-item';

type TabsProps = {
  currentCity: Cities;
}

function Tabs({currentCity}: TabsProps): JSX.Element {

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            Object.values(Cities).map(
              (city) => <MemoizedLocationItem key={city} isTabs city={city} isActive={currentCity === city} />
            )
          }
        </ul>
      </section>
    </div>
  );
}

const MemoizedTabs = memo(Tabs);

export default MemoizedTabs;
