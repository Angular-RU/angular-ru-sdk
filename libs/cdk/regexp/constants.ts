export const REG_EXP_STRICT_NAME = /^[,A-Z_a-z][\w,]*$/;
export const REG_EXP_NO_CYRILLIC = /[^,А-я]+/g;
export const REG_EXP_DIGITS_SEPARATED_BY_COMMA = /\d+(,\d+)*,?/g;
export const REG_EXP_DIGITS = /\d*/g;
export const REG_EXP_CREDIT_CARD_NUMBER_WITH_SEPARATOR = /^(?:\d{4}-){3}\d{4}$/g;
export const REG_EXP_NUMBER = /^(\d+(\.\d+)?)$/;
