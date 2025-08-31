import { memo } from 'react';
import { MemoizedLocationList } from '../../entities';

function TabsCity(){

  return (
    <div className="tabs">
      <section className="locations container">
        <MemoizedLocationList />
      </section>
    </div>
  );
}

const MemoizedTabsCity = memo(TabsCity);

export { MemoizedTabsCity };
