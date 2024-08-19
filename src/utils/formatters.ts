const getOnlyNumbers = (value: string) => {
  return value.replace(/\D/g, '')
}

const formatCpf = (value: string) => {
  const cleanedValue = getOnlyNumbers(value)

  return cleanedValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export {
  getOnlyNumbers,
  formatCpf
}