import cn from 'classnames';
import { memo } from 'react';

type FavoritButtonProps = {
  className: string;
  iconWidth: string;
  iconHeight: string;
  isFavorite: boolean;
  handleFavoritButtonClick: () => void;
  isDisabled: boolean;
}

function FavoritButton({
  className,
  iconWidth,
  iconHeight,
  isFavorite,
  handleFavoritButtonClick,
  isDisabled
}: FavoritButtonProps): JSX.Element {
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
