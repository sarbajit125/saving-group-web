import { create } from 'zustand';
import { UserDetails } from '../models/responseModels';
import { UIString } from '../constants/coreLibrary';

export const useUserStore = create<UserDataManager>((set) => ({
  userDetails: {
    email: UIString.empty,
    userId: UIString.empty,
    username: UIString.empty,
  },
  setUserDetails(details) {
    set(() => ({ userDetails: details }));
  },
}));
export interface UserDataManager {
  userDetails: UserDetails;
  setUserDetails: (details: UserDetails) => void;
}
