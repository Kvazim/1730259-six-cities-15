import { createBrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../shared/lib/const/const';
import Layout from '../layout/layout';

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: AppRoute.Root,
        // element: <MemoizedMain />
        async lazy() {
          const { default: MemoizedMain } = await import('../../pages/main/main');

          return {
            Component: MemoizedMain
          };
        },
      },
      {
        path: `${AppRoute.Offer}:id`,
        async lazy() {
          const { default: MemoizedOfferPage } = await import('../../pages/main/main');

          return {
            Component: MemoizedOfferPage
          };
        }
      },
      {
        path: `${AppRoute.Offer}:id`,
        async lazy() {
          const { default: MemoizedOfferPage } = await import('../../pages/main/main');

          return {
            Component: MemoizedOfferPage
          };
        }
      },
      {
        path: `${AppRoute.Offer}:id`,
        async lazy() {
          const { default: MemoizedOfferPage } = await import('../../pages/main/main');

          return {
            Component: MemoizedOfferPage
          };
        }
      },
    ],
  },
]);
