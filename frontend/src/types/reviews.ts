import { Host } from './offers';

export type Review = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: Host;
};

export type Reviews = Review[];

export type NewReview = Omit<Review, 'user' | 'date'>;
