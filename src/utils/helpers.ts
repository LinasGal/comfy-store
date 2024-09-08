export const formatPrice = (value: string | number) => {
  const price = typeof value === 'string' ? parseInt(value) : value;

  const convertToFloat = parseFloat((price / 100).toFixed(2));

  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(convertToFloat);

  return dollarsAmount;
};
