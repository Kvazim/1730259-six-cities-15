import { useNavigate } from 'react-router-dom';
import MemoizedFavoritButton from '../../shared/ui/favorit-button/favorit-button';
import { AppRoute } from '../../shared/lib/const/const';
import { memo } from 'react';
import { useToggleFavoriteMutation } from './model';
import { toast } from 'react-toastify';

type ToggleFavoriteButtonProps = {
  id: string;
  className: string;
  iconWidth: string;
  iconHeight: string;
  isFavorite: boolean;
  isAuthorized: boolean;
}

function ToggleFavoriteButton(
  {className, iconWidth, iconHeight, isFavorite, isAuthorized, id}: ToggleFavoriteButtonProps
): JSX.Element {
  const navigate = useNavigate();

  const [ toggleFavorite , { isLoading }] = useToggleFavoriteMutation();

  const executeToggleFavorite = async () => {
    try {
      await toggleFavorite({ id, isFavorite }).unwrap();
      toast.success(isFavorite ? 'Удалено из избранного' : 'Добавлено в избранное');
    } catch (error) {
      toast.warn('Ошибка добавления/удаления избранного, попробуйте еще раз');
    }
  };

  const onFavoriteButtonClick = () => {
    if (!isAuthorized) {
      return navigate(AppRoute.Login, {replace: true});
    }

    executeToggleFavorite();
  };

  return (
    <MemoizedFavoritButton
      className={className}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      isFavorite={isFavorite}
      handleFavoritButtonClick={onFavoriteButtonClick}
      isDisabled={isLoading}
    />
  );
}

const MemoizedToggleFavoriteButton = memo(ToggleFavoriteButton);

export { MemoizedToggleFavoriteButton };
