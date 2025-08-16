import { Link, useSearchParams } from 'react-router-dom';
import { capitalize } from '../../utils/utils';
import cn from 'classnames';
import { AppRoute, CITY, Cities, DEFAULT_SORT, SORT_TYPE } from '../../const';
import { memo } from 'react';

type LocationLinkProps = {
  isTabs?: boolean;
  isActive?: boolean;
  city: keyof typeof Cities | Cities;
}

function LocationLink({city, isTabs, isActive}: LocationLinkProps):JSX.Element {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get(SORT_TYPE) as Cities;

  return (
    <Link
      className={
        cn(
          'locations__item-link',
          {'tabs__item': isTabs},
          {'tabs__item--active': isActive}
        )
      }
      to={`${AppRoute.Root}?${CITY}=${city}&${SORT_TYPE}=${isTabs ? currentSort : DEFAULT_SORT}`}
    >
      <span>{capitalize(city)}</span>
    </Link>
  );
}

const MemoizedLocationLink = memo(LocationLink);

export default MemoizedLocationLink;
