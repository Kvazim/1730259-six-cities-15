import { Link, useSearchParams } from 'react-router';
import { capitalize } from '../../utils/utils';
import cn from 'classnames';
import type { Cities } from '../../const';
import { AppRoute, CITY, DEFAULT_SORT, SORT_TYPE } from '../../const';
import { memo } from 'react';

interface LocationLinkProps {
  isTabs?: boolean;
  isActive?: boolean;
  city: keyof typeof Cities | Cities;
}

function LocationLink({ city, isTabs, isActive }: LocationLinkProps) {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get(SORT_TYPE) as Cities;

  return (
    <Link
      className={cn(
        'locations__item-link',
        { tabs__item: isTabs },
        { 'tabs__item--active': isActive },
      )}
      to={`${AppRoute.Root}?${CITY}=${city}&${SORT_TYPE}=${isTabs ? currentSort : DEFAULT_SORT}`}
    >
      <span>{capitalize(city)}</span>
    </Link>
  );
}

const MemoizedLocationLink = memo(LocationLink);

export default MemoizedLocationLink;
