import { AuthorizationStatus, NameSpace } from '../../shared/lib/const/const';
import { State } from '../../shared/types/state';
import { UserData } from '../../shared/types/user-data';


export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUserData = (state: State): UserData | null => state[NameSpace.User].userData;
