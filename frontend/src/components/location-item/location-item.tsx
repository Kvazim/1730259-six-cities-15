import { memo } from 'react';
import { Cities } from '../../const';
import MemoizedLocationItemWrapper from '../location-item-wrapper/location-item-wrapper';
import MemoizedLocationLink from '../location-link/location-link';

type LocationItemProps = {
  isTabs?: boolean;
  isActive?: boolean;
  city: keyof typeof Cities | Cities;
}

function LocationItem({isTabs, city, isActive}: LocationItemProps): JSX.Element {

  return (
    <MemoizedLocationItemWrapper isTabs={isTabs}>
      <MemoizedLocationLink isTabs={isTabs} city={city} isActive={isActive} />
    </MemoizedLocationItemWrapper>
  );
}

const MemoizedLocationItem = memo(LocationItem);

export default MemoizedLocationItem;
