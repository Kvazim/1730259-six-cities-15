import { Cities } from '../../const';
import LocationItemWrapper from '../location-item-wrapper/location-item-wrapper';
import LocationLink from '../location-link/location-link';

type LocationItemProps = {
  isTabs?: boolean;
  city: Cities;
  isActive?: boolean;
}

function LocationItem({isTabs, isActive, city}: LocationItemProps): JSX.Element {
  return (
    <LocationItemWrapper isTabs={isTabs}>
      <LocationLink isTabs={isTabs} isActive={isActive} city={city} />
    </LocationItemWrapper>
  );
}

export default LocationItem;
