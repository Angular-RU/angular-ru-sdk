export const REG_EXP_STRICT_NAME: RegExp = /^[a-z,A-Z,_]{1}[a-z,A-Z,0-9,_,]*$/;
export const REG_EXP_NO_CYRILLIC: RegExp = /[^а-я,А-Я]+/g;
export const REG_EXP_DIGITS_SEPARATED_BY_COMMA: RegExp = /[0-9]+(,[0-9]+)*,?/g;
export const REG_EXP_DIGITS: RegExp = /[0-9]*/g;
export const REG_EXP_CREDIT_CARD_NUMBER_WITH_SEPARATOR: RegExp = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/g;
