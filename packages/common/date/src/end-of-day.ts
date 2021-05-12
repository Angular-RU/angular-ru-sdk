export function endOfDay(date: Date = new Date()): Date {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return new Date(date.setHours(23, 59, 59, 999));
}
