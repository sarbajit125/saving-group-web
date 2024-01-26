import { GroupItemUIDao, GroupRoles } from '../models/uiModels';

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
export const dummyGroupList: GroupItemUIDao[] = [
    {
      groupCode: 'ABC1234',
      groupImage:
        'https://uploads-ssl.webflow.com/5fe0022130b6119c3b25d03f/6000a4262c3c62f6aadb85d3_shutterstock_1044844045.jpg',
      groupName: 'Cuisine',
      role: GroupRoles.Gold,
      memberCount: 3,
    },
    {
      groupCode: 'ABC1235',
      groupImage: null,
      groupName: 'Art',
      role: GroupRoles.Gold,
      memberCount: 1,
    },
    {
      groupCode: 'ABC1239',
      groupImage: null,
      groupName: 'Music',
      role: GroupRoles.Silver,
      memberCount: 1,
    },
    {
      groupCode: 'ABC1236',
      groupImage:
        'https://images.unsplash.com/photo-1525824236856-8c0a31dfe3be?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdhdGVyZmFsbHxlbnwwfHwwfHx8MA%3D%3D',
      groupName: 'Vizaag',
      role: GroupRoles.Regular,
      memberCount: 4,
    },
    {
      groupCode: 'ABC1237',
      groupImage: null,
      groupName: 'Dhamra',
      role: GroupRoles.Regular,
      memberCount: 1,
    },
  ];
