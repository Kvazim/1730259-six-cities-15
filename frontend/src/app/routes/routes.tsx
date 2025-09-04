import { createBrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../shared/lib/const/const';
import PrivateRoute from './private-route';
import { checkAuthPrefetch, getNearPrefetch, getPlacesByIdPrefetch, getReviewsByIdPrefetch } from '../../entities';
import { getPlacesPrefetch } from '../../features';

const loadStore = () => import('../app-store').then((module) => module.appStore);

export const routes = createBrowserRouter([
  {
    async lazy() {
      const { Layout } = await import('../layout/layout');

      return {
        Component: Layout
      };
    },
    loader: () => {
      loadStore()
        .then(
          (appStore) =>
            appStore.dispatch(checkAuthPrefetch()).unwrap()
        );
      return null;
    },
    children: [
      {
        path: AppRoute.Root,
        loader: () => {
          loadStore()
            .then(
              (appStore) =>
                appStore.dispatch(getPlacesPrefetch()).unwrap()
            );
          return null;
        },
        async lazy() {
          const { MemoizedMain } = await import('../../pages');

          return {
            Component: MemoizedMain
          };
        }
      },
      {
        path: `${AppRoute.Offer}:id`,
        loader: ({ params }) => {
          const { id } = params;

          if (!id) {
            return null;
          }

          loadStore()
            .then(
              (appStore) =>{
                appStore.dispatch(getPlacesByIdPrefetch(id)).unwrap();
                appStore.dispatch(getReviewsByIdPrefetch(id)).unwrap();
                appStore.dispatch(getNearPrefetch(id)).unwrap();
              }
            );
          return null;
        },
        async lazy() {
          const { MemoizedOfferPage } = await import('../../pages');

          return {
            Component: MemoizedOfferPage
          };
        }
      },
      {
        path: AppRoute.Login,
        async lazy() {
          const { MemoizedLogin } = await import('../../pages');

          return {
            element: (
              <PrivateRoute isReverse>
                <MemoizedLogin />
              </PrivateRoute>
            )
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
