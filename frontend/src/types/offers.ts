import { Cities } from '../const';

export type ApartmentType = 'apartment' | 'room' | 'house' | 'hotel';

export type City = {
  name: keyof typeof Cities;
  location: Location;
};

export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
};

export type Offer = {
  id: string;
  title: string;
  type: ApartmentType;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type Offers = Offer[];

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type FullOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
};

export type OfferMapItem = {
  id: Offer['id'];
  city: City;
  location: Location;
}

export type OfferMapItems = OfferMapItem[];
