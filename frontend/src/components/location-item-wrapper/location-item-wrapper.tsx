import { memo, useMemo } from 'react';

type LocationItemWrapperProps = {
  isTabs?: boolean;
  children: JSX.Element;
}

function LocationItemWrapper({isTabs, children}: LocationItemWrapperProps): JSX.Element {
  const WrapperTag = useMemo(() => isTabs ? 'li' : 'div', [isTabs]);

  return (
    <WrapperTag className="locations__item">
      {children}
    </WrapperTag>
  );

}

const MemoizedLocationItemWrapper = memo(LocationItemWrapper);

export default MemoizedLocationItemWrapper;
