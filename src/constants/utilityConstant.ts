import { GroupRoles } from '../models/uiModels';

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
