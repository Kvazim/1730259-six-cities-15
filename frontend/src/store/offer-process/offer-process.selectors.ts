import { NameSpace, Status } from '../../const';
import { FullOffer, Offer, Offers } from '../../types/offers';
import { State } from '../../types/state';

export const getOffersData = (state: State): Offers => state[NameSpace.Offers].offers;

export const getOffersLoadingStatus = (state: State): Status => state[NameSpace.Offers].offersLoadingStatus;

export const getFullOffer = (state: State): FullOffer | null => state[NameSpace.Offers].fullOffer;

export const getFullOfferLoadingStatus = (state: State): Status => state[NameSpace.Offers].fullOfferLoadingStatus;

export const getCurrentOfferId = (state: State): Offer['id'] | null => state[NameSpace.Offers].currentOfferId;

export const getNearByOffers = (state: State): Offers => state[NameSpace.Offers].nearByOffers;

export const getNearByOffersLoadingStatus = (state: State): Status => state[NameSpace.Offers].nearByOffersLoadingStatus;
