const formatCurrency = (value) => {
  if (!!value) return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
  else return 0;
};
export default formatCurrency;
