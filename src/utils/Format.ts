export function formatNumber(number: number | undefined) {
    if (number === undefined) {
      return 0;
    } else {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
  