const isValidCpf = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  let res;

  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  res = (sum * 10) % 11;

  if (res === 10 || res === 11) res = 0;
  if (res !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  res = (sum * 10) % 11;

  if (res === 10 || res === 11) res = 0;
  if (res !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

export {
  isValidCpf
}