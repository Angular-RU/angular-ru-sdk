const MAX_YEAR: number = 3000;

export function dateStringToDate(date: string | Date): Date {
    if (date instanceof Date) {
        return date;
    }

    const firstItem: number = 1;
    const parsedDate: string = (date || '')
        .replace(/^(\d)/, '0$1')
        .replace(/\.(\d)\./, '.0$1.')
        .replace('..', '.01.')
        .replace(/^\./, '01.')
        .replace(/(\d{3})\./g, (str: string): string => str.slice(firstItem))
        .replace(/(\d{2}).(\d{2}).(\d{4})/, '$2/$1/$3')
        .replace(/00\//g, '01/');

    const dateValue: Date = new Date(parsedDate);

    if (dateValue.getFullYear() > MAX_YEAR) {
        return new Date();
    }

    return isNaN(dateValue.getTime()) ? new Date() : dateValue;
}
