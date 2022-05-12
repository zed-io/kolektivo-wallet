// Supported local currency codes
// Please keep it sorted alphabetically
export enum LocalCurrencyCode {
  AUD = 'AUD',
  BRL = 'BRL',
  CAD = 'CAD',
  CNY = 'CNY',
  COP = 'COP',
  CVE = 'CVE',
  EUR = 'EUR',
  GBP = 'GBP',
  GHS = 'GHS',
  GNF = 'GNF',
  INR = 'INR',
  KES = 'KES',
  LRD = 'LRD',
  MXN = 'MXN',
  NGN = 'NGN',
  PHP = 'PHP',
  RUB = 'RUB',
  RWF = 'RWF',
  SLL = 'SLL',
  TRY = 'TRY',
  UAH = 'UAH',
  UGX = 'UGX',
  USD = 'USD',
  XOF = 'XOF',
  XAF = 'XAF',
  ZAR = 'ZAR',
  ANG = 'ANG',
}

export enum LocalCurrencySymbol {
  AUD = 'A$',
  BRL = 'R$',
  CAD = '$',
  CNY = '¥',
  COP = '$',
  CVE = '$',
  EUR = '€',
  GBP = '£',
  GHS = 'GH₵',
  GNF = 'FG',
  INR = '₹',
  KES = 'KSh',
  LRD = 'L$',
  MXN = '$',
  NGN = '₦',
  PHP = '₱',
  RUB = '₽',
  RWF = 'FRw',
  SLL = 'Le',
  TRY = '₺',
  UAH = '₴',
  UGX = 'USh',
  USD = '$',
  XAF = 'FCFA',
  XOF = 'CFA',
  ZAR = 'R',
  ANG = 'ƒ',
}

export const LOCAL_CURRENCY_CODES = Object.values(LocalCurrencyCode)
