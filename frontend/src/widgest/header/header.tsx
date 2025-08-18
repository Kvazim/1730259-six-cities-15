import MemoizedLogo from '../../shared/ui/logo/logo';
import { AppRoute } from '../../shared/lib/const/const';
import MemoizedHeaderNav from '../../entities/header-nav/header-nav';
import { memo, useMemo } from 'react';

type HeaderProps = {
  pathname: AppRoute;
}

function Header({pathname}: HeaderProps): JSX.Element {
  const isLogin = useMemo(() => pathname !== AppRoute.Login, [pathname]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <MemoizedLogo pathname={pathname} />
          </div>
          {isLogin && <MemoizedHeaderNav />}
        </div>
      </div>
    </header>
  );
}

const MemoizedHeader = memo(Header);

export default MemoizedHeader;
