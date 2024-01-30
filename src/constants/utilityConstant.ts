import { GroupUserShortDao } from '../models/responseModels';
import { GroupRoles, SendInviteUserDao, UserGroupStatus } from '../models/uiModels';

export const convertDataToRoleEnum = (roleStr: string): GroupRoles => {
  switch (roleStr) {
    case 'GOLD':
      return GroupRoles.Gold;
    case 'SILVER':
      return GroupRoles.Silver;
    case 'REGULAR':
      return GroupRoles.Regular;
    default:
      return GroupRoles.Regular;
  }
};

export const dummyFavList: SendInviteUserDao[] = [
  {
    userId: '88e5419a-e649-495f-9354-56bc031b95b5',
    email: 'ABC125@gmail.com',
    userImg:
      'https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY=',
    userName: 'HarryHarold',
    type: 'NONE',
    isSelected: false,
  },
  {
    userId: '2',
    email: 'ABC122@gmail.com',
    userImg: null,
    userName: 'BarryHarold',
    type: 'NONE',
    isSelected: false,
  },
  {
    userId: 'b3c61260-5f73-4243-b4d8-1763803c0322',
    email: 'ABC123@gmail.com',
    userImg:
      'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    userName: 'HackerMunda',
    type: 'NONE',
    isSelected: false,
  },
];

export const checkMemberInFavList = (
  favList: SendInviteUserDao[],
  usersList: GroupUserShortDao[]
): SendInviteUserDao[] => {
  const updatedFavList: SendInviteUserDao[] = favList.map((fav) => ({
    ...fav,
    type:
      usersList.find((user) => user.userDetails.userId === fav.userId) !== undefined
        ? usersList.find((user) => user.userDetails.userId === fav.userId)?.status ===
          UserGroupStatus.active
          ? 'MEMBER'
          : 'INVITED'
        : 'NONE',
  }));
  return updatedFavList;
};
