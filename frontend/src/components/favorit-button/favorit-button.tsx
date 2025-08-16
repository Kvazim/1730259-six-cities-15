import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateFavoriteOffersAction } from '../../store/api-actions';
import { Offer } from '../../types/offers';
import { AppRoute, AuthorizationStatus, Status } from '../../const';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { getFavoriteUpdateOffersLoadingStatus } from '../../store/favorite-process/favorite-process.selectors';

type FavoritButtonProps = {
  id: Offer['id'];
  className: string;
  iconWidth: string;
  iconHeight: string;
  isFavorite: boolean;
}

function FavoritButton({id, className, iconWidth, iconHeight, isFavorite}: FavoritButtonProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const udateFavoritLoadingStatus = useAppSelector(getFavoriteUpdateOffersLoadingStatus);
  const isDisabled = udateFavoritLoadingStatus === Status.Loading;

  const handleFavoritButtonClick = () => {
    if (!isAuthorized) {
      return navigate(AppRoute.Login, {replace: true});
    }

    dispatch(updateFavoriteOffersAction({
      id,
      status: Number(!isFavorite)
    }));
  };

  return (
    <button
      className={
        cn(
          `${className}__bookmark-button button`,
          {[`${className}__bookmark-button--active`]: isFavorite}
        )
      }
      type="button"
      onClick={handleFavoritButtonClick}
      disabled={isDisabled}
    >
      <svg
        className={`${className}__bookmark-icon`}
        width={iconWidth}
        height={iconHeight}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

const MemoizedFavoritButton = memo(FavoritButton);

export default MemoizedFavoritButton;
