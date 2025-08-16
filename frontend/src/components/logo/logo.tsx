import MemoizedLogoLink from '../logo-link/logo-link';
import { AppRoute } from '../../const';
import cn from 'classnames';
import MemoizedLogoImage from '../logo-image/logo-image';
import { memo, useMemo } from 'react';

type LogoProps = {
  isFooter?: boolean;
  pathname?: AppRoute;
}

function Logo({isFooter, pathname}: LogoProps): JSX.Element {
  const classLink = useMemo(() =>
    cn(
      {'footer__logo-link': isFooter},
      {'header__logo-link': !isFooter},
      {'header__logo-link--active': pathname === AppRoute.Root}
    ), [isFooter, pathname]);

  return (
    <MemoizedLogoLink
      isFooter={isFooter}
      isMain={pathname === AppRoute.Root}
      classLink={classLink}
    >
      <MemoizedLogoImage
        classImage={isFooter ? 'footer__logo' : 'header__logo'}
        imageWidth={isFooter ? '64' : '81'}
        imageHeight={isFooter ? '33' : '41'}
      />
    </MemoizedLogoLink>
  );
}

const MemoizedLogo = memo(Logo);

export default MemoizedLogo;
