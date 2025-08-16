import { Location } from 'react-router-dom';
import { AppRoute } from '../const';

export interface MyLocation extends Location {
  pathname: AppRoute;
  search: string;
}
