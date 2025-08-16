import { memo } from 'react';

type PremiumProps = {
  className?: string;
}

function Premium({className}: PremiumProps): JSX.Element {
  return (
    <div className={className}>
      <span>Premium</span>
    </div>
  );
}

const MemoizedPremium = memo(Premium);

export default MemoizedPremium;
