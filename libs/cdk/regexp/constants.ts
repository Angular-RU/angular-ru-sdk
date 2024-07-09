export const REG_EXP_STRICT_NAME: RegExp = /^[,A-Z_a-z][\w,]*$/;
export const REG_EXP_NO_CYRILLIC: RegExp = /[^,А-я]+/g;
export const REG_EXP_DIGITS_SEPARATED_BY_COMMA: RegExp = /\d+(,\d+)*,?/g;
export const REG_EXP_DIGITS: RegExp = /\d*/g;
export const REG_EXP_CREDIT_CARD_NUMBER_WITH_SEPARATOR: RegExp = /^(?:\d{4}-){3}\d{4}$/g;
export const REG_EXP_NUMBER: RegExp = /^(\d+(\.\d+)?)$/;
