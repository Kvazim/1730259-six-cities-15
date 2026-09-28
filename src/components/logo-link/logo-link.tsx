import type { ReactNode } from 'react';
import { memo } from 'react';
import { AppRoute } from '../../const';
import { Link } from 'react-router';

interface LogoLinkProps {
  isFooter?: boolean;
  isMain: boolean;
  children: ReactNode;
  classLink: string;
}

const LogoLink = ({ isFooter, isMain, classLink, children }: LogoLinkProps) =>
  isMain && !isFooter ? (
    <span className={classLink}>{children}</span>
  ) : (
    <Link to={AppRoute.Root} className={classLink}>
      {children}
    </Link>
  );

const MemoizedLogoLink = memo(LogoLink);

export default MemoizedLogoLink;
