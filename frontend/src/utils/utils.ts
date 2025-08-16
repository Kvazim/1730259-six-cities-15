import { EMAIL_REG_EXP, LoginCredentials, MouseEvent, PASSWORD_REG_EXP, SortType } from '../const';
import { Offers } from '../types/offers';

export const capitalize = (item: string | null): string | null => item !== null ? item.charAt(0).toUpperCase() + item.substring(1) : null;

export const decapitalize = (item: string | null): string | null => item !== null ? item.charAt(0).toLowerCase() + item.substring(1) : null;

export function getRandomArrayItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export const getCurrentOffers = (location: string, offers: Offers): Offers => offers.filter((offer) => location.toLowerCase() === offer.city.name.toLowerCase());

export const convertRatingToPercentage = (item: number) => `${String(Math.round(item) / 0.05)}%`;

export const sortingType = {
  [SortType.Popular]: (offers: Offers) => [...offers],
  [SortType.HightPrice]: (offers: Offers) => offers.slice().sort((offerFirst, offerSecond) => offerSecond.price - offerFirst.price),
  [SortType.LowPrice]: (offers: Offers) => offers.slice().sort((offerFirst, offerSecond) => offerFirst.price - offerSecond.price),
  [SortType.Rating]: (offers: Offers) => offers.slice().sort((offerFirst, offerSecond) => offerSecond.rating - offerFirst.rating)
};

export const mouseEvents: {
  [key in MouseEvent]: (id: string) => string | null;
} = {
  [MouseEvent.MouseEnter]: (id) => id,
  [MouseEvent.MouseLeave]: () => null
};

export const validateLoginAndEmail = (authData: FormData) => {
  const isValidEmail = EMAIL_REG_EXP.test(authData.get(LoginCredentials.Email) as string);
  const isValidPassword = PASSWORD_REG_EXP.test(authData.get(LoginCredentials.Password) as string);

  return isValidEmail && isValidPassword;
};

export const getDataToMap = (array: Offers) => array.map(({id, city, location}) => ({id, city, location}));
