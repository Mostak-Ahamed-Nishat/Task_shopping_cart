export const originalPrice = (currentPrice, percentage) => {
  // percentage to a decimal
  var decimalPercentage = percentage / 100;

  // original price
  var originalPrice = currentPrice / (1 - decimalPercentage);

  return originalPrice.toFixed(2);
};
