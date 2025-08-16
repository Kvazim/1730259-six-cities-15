import { Offer } from './offers';

export type UpdateFavoriteStatus = {
  id: Offer['id'];
  status: number;
};
