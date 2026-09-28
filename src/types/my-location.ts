import type { Location } from 'react-router';
import type { AppRoute } from '../const';

export interface MyLocation extends Location {
  pathname: AppRoute;
  search: string;
}
