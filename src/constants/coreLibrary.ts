export enum StatusType {
    success = 'SUCCESS',
    failure = 'FAILED',
    pending = 'PENDING'
}

export enum DateFormatConstants {
    dashboard = 'DD MMM YY',

}

export const formattedCurrency = (currencySymbol: string, amount: number): string => {
    // format number to Indian rupee
const rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencySymbol,
});
return rupee.format(amount).toString();
};

export const calculateTimeDifference = (targetTime: Date): string => {
    const currentTime = new Date();
    const difference = Math.abs(currentTime.getTime() - targetTime.getTime());

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const remainingHours = hours % 24;
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} d ${remainingHours} hr${remainingHours > 1 ? 's' : ''}`;
    }
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  };
