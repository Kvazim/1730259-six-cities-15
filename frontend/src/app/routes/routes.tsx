import { createBrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../shared/lib/const/const';
import { Layout } from '../layout/layout';
import { userApi } from '../../entities/header-nav/model/user-api';

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => userApi.endpoints.checkAuth.initiate(),
    children: [
      {
        path: AppRoute.Root,
        async lazy() {
          const { MemoizedMain } = await import('../../pages');

          return {
            Component: MemoizedMain
          };
        },
      },
      // {
      //   path: `${AppRoute.Offer}:id`,
      //   async lazy() {
      //     const { default: MemoizedOfferPage } = await import('../../pages/main/main');

      //     return {
      //       Component: MemoizedOfferPage
      //     };
      //   }
      // },
      {
        path: AppRoute.Login,
        async lazy() {
          const { MemoizedLogin } = await import('../../pages');

          return {
            Component: MemoizedLogin
          };
        }
      },
      // {
      //   path: `${AppRoute.Offer}:id`,
      //   async lazy() {
      //     const { default: MemoizedOfferPage } = await import('../../pages/main/main');

      //     return {
      //       Component: MemoizedOfferPage
      //     };
      //   }
      // },
      {
        path: '*',
        async lazy() {
          const { PageNotFound } = await import('../../pages');
          return {
            Component: PageNotFound
          };
        }
      },
    ],
  },
]);
