import { memo } from 'react';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

type LogoLinkProps = {
  isFooter?: boolean;
  isMain: boolean;
  children: JSX.Element;
  classLink: string;
}

const LogoLink = ({ isFooter, isMain, classLink, children }: LogoLinkProps): JSX.Element => (
  isMain && !isFooter ? (
    <a className={classLink}>
      {children}
    </a>
  ) : (
    <Link to={AppRoute.Root} className={classLink}>
      {children}
    </Link>
  )
);

const MemoizedLogoLink = memo(LogoLink);

export default MemoizedLogoLink;
