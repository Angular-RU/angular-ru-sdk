export function isDateValid(date?: Date): boolean {
    return date instanceof Date && Boolean(date.getTime());
}
