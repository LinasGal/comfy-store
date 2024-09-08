export const formatPrice = (price: string) => {
  const strToNum = parseFloat((parseInt(price) / 100).toFixed(2));

  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(strToNum);

  return dollarsAmount;
};
