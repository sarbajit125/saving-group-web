import { ColorDao } from '../constants/colorConstant';

export interface ServiceCardsDao {
    serviceCode: string,
    name: string,
    icon: JSX.Element,
    bgColor?: ColorDao,
    textColor?: string,
}
