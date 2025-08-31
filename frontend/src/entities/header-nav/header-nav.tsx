import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../shared/lib/const/const';
import { memo, useCallback } from 'react';
import { useAppSelector } from '../../shared/lib/redux';
import { useCheckAuthQuery, useLogoutMutation } from './model';
import { authStatus } from './model';

function HeaderNav(): JSX.Element {
  const { data } = useCheckAuthQuery();
  const [ logout, { isLoading } ] = useLogoutMutation();

  const authorizationStatus = useAppSelector(authStatus);

  const favoriteOffers = [];

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleClickLogout = useCallback((evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    logout().unwrap();
  }, [logout]);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={isAuth ? AppRoute.Favorites : AppRoute.Login}>
            <div className="header__avatar-wrapper user__avatar-wrapper"
              style={{
                backgroundImage: `url(${data?.avatarUrl ?? '../img/avatar.svg'})`,
                borderRadius: '50%'
              }}
            >
            </div>
            {
              isAuth
                ?
                <>
                  <span className="header__user-name user__name">{data?.email}</span>
                  <span className="header__favorite-count">{favoriteOffers.length}</span>
                </>
                :
                <span className="header__login">Sign in</span>
            }
          </Link>
        </li>
        {
          isAuth &&
            <li className="header__nav-item">
              <a className="header__nav-link" href='#todo' onClick={handleClickLogout}>
                <span className="header__signout">{isLoading ? 'out...' : 'Sign out'}</span>
              </a>
            </li>
        }
      </ul>
    </nav>
  );
}

export const MemoizedHeaderNav = memo(HeaderNav);
