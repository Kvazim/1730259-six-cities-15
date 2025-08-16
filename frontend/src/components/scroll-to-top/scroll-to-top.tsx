import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_ZERO } from '../../const';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(DEFAULT_ZERO, DEFAULT_ZERO);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
