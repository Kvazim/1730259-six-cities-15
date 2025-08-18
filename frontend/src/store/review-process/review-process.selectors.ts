import { NameSpace, Status } from '../../shared/lib/const/const';
import { Reviews } from '../../shared/types/reviews';
import { State } from '../../shared/types/state';

export const getReviewsData = (state: State): Reviews => state[NameSpace.Reviews].reviews;
export const getReviewsLoadingStatus = (state: State): Status => state[NameSpace.Reviews].reviewsLoadingStatus;
export const getAddReviewsLoadingStatus = (state: State): Status => state[NameSpace.Reviews].addReviewsLoadingStatus;
