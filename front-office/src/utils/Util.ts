import moment from 'moment';

export function formatNumber(number:number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(0) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(0) + 'k';
    } else {
      return number;
    }
  }

export function formatAmount(amount: number): string {
    const formattedAmount = new Intl.NumberFormat('fr-FR').format(amount);
    return formattedAmount;
}

export function formatTime(date: string): string {
  moment.locale('fr');
  const transactionDate = moment.tz(date, 'Indian/Antananarivo');
  const formattedDate = transactionDate.fromNow();
  return formattedDate;
}