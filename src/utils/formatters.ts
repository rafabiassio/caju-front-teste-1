import { parse, format, isValid } from 'date-fns';

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

const formatISOtoLocale = (dateValue: string): string => {
  const parsedDate = parse(dateValue, 'yyyy-MM-dd', new Date());
  return isValid(parsedDate) ? format(parsedDate, 'dd/MM/yyyy') : '';
};

const formatLocaleToISO = (dateValue: string): string => {
  const date = parse(dateValue, 'dd/MM/yyyy', new Date());

  if (!isValid(date)) {
    return ''
  }

  return format(date, 'yyyy-MM-dd')
};

export {
  getOnlyNumbers,
  formatCpf,
  formatISOtoLocale,
  formatLocaleToISO
}