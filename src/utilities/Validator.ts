export const phoneValidator = (phone: number) => {
  if (phone > 999_999_999) return true;
  return false;
};

export const isNumericalValue = (num: number) => {
  if (typeof num == 'number') return true;
  return false;
};

export const isStockName = (stockName: string) => {
  if (stockName != undefined) return true;
  return false;
};

export const isComparator = (comparator: string) => {
  if (comparator != undefined) return true;
  return false;
};

export const isPrice = (price: number) => {
  if (price > 0) return true;
  return false;
};

export const isSell = (sell: boolean) => {
  if (typeof sell == 'boolean') return true;
  return false;
};

export const isT = (T: Array<number>) => {
  T.forEach((element) => {
    if (typeof element != 'number') return false;
  });
  return true;
};
