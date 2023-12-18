export enum StatusType {
    success = 'SUCCESS',
    failure = 'FAILED',
    pending = 'PENDING'
}

export const formattedCurrency = (currencySymbol: string, amount: number): string => {
    // format number to Indian rupee
const rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencySymbol,
});
return rupee.format(amount).toString();
};
