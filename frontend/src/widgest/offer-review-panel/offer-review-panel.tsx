import { memo } from 'react';
import { MemoizedOfferReviews } from '../../entities';
import { MemoizedReviewsForm } from '../../features';

type OfferReviewPanelProps = {
  isAuth: boolean;
}

function OfferReviewPanel({isAuth}: OfferReviewPanelProps) {
  return (
    <MemoizedOfferReviews >
      {isAuth && <MemoizedReviewsForm />}
    </MemoizedOfferReviews>
  );
}

const MemoizedOfferReviewPanel = memo(OfferReviewPanel);

export { MemoizedOfferReviewPanel };
