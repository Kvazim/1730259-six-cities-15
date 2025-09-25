import { memo, ReactNode } from 'react';
import { MemoizedPlaces } from '../../entities';
import { MemoizedToggleFavoriteButton } from '../../features';
import { OfferMapItem } from '../../shared/types/offers';

type PlacesDetailsProps = {
  children?: ReactNode;
  isAuth: boolean;
  onCurrentOfferChange: (offer: OfferMapItem | null) => void;
};

function PlacesDetails({children, isAuth, onCurrentOfferChange}: PlacesDetailsProps) {
  return (
    <MemoizedPlaces
      onCurrentOfferChange={onCurrentOfferChange}
      favoritButton={({ isFavorite, id }) => (
        <MemoizedToggleFavoriteButton
          className="offer"
          iconWidth="31"
          iconHeight="33"
          isFavorite={isFavorite}
          id={id}
          isAuthorized={isAuth}
        />
      )}
    >
      {children}
    </MemoizedPlaces>
  );
}
const MemoizedPlacesDetails = memo(PlacesDetails);

export { MemoizedPlacesDetails };
