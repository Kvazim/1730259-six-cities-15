import { memo, ReactNode } from 'react';

type OfferNameProps = {
  title: string;
  children?: ReactNode;
}

function OfferName({title, children}: OfferNameProps): JSX.Element {
  return (
    <div className="offer__name-wrapper">
      <h1 className="offer__name">
        {title}
      </h1>
      {children}
    </div>
  );
}

const MemoizedOfferName = memo(OfferName);

export default MemoizedOfferName;
